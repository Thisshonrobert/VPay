"use client"

import { useState, useEffect } from "react";
import { CreateOnRampTxn } from "../app/lib/action/CreateOnRampTxn";
import { useMessage } from "hooks/useMessage";
import { useRouter } from "next/navigation";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    short: "HDFC",
    tint: "#004c8f",
}];

const QUICK_AMOUNTS = [500, 1000, 2000, 5000];

export const AddMoney = () => {
    const router = useRouter();
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const { bark } = useMessage();

    // The bank popup broadcasts the outcome back to this tab.
    useEffect(() => {
        const channel = new BroadcastChannel('payment_channel');
        channel.onmessage = (event) => {
            if (event.data === 'payment_success' || event.data === 'payment_failure') {
                router.refresh();
            }
        };
        return () => {
            channel.close();
        };
    }, [router]);

    const numericAmount = Number(amount);
    const canSubmit = numericAmount > 0 && !Number.isNaN(numericAmount);

    const onAddMoney = async () => {
        if (!canSubmit) {
            bark({ message: "Enter a valid amount", success: false });
            return;
        }

        setLoading(true);

        // Open synchronously so the popup blocker doesn't reject it. Note: do NOT
        // pass "noopener" here — it makes window.open return null, leaving a blank
        // window we can never navigate or close.
        const popup = window.open("", "_blank", "width=600,height=700");

        try {
            const response = await CreateOnRampTxn(provider, numericAmount * 100);

            if (response?.redirectUrl) {
                if (popup) {
                    popup.location.href = response.redirectUrl;
                } else {
                    // Popup was blocked — fall back to the current tab.
                    window.location.href = response.redirectUrl;
                }
                return;
            }

            // No redirect URL: surface why (rate limit, bank-server down, etc).
            popup?.close();
            bark({
                message: response?.message ?? response?.error ?? "Could not reach the bank. Please try again.",
                success: false,
            });
        } catch (err) {
            popup?.close();
            console.error("Add money failed:", err);
            bark({ message: "Could not start the payment. Please try again.", success: false });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="rounded-m3-2xl border border-border bg-card p-5 shadow-m3-1 sm:p-7">
            <h2 className="mb-1 font-display text-title-lg text-foreground">Add money to wallet</h2>
            <p className="mb-6 text-body-md text-muted-foreground">
                Top up instantly from your linked bank account.
            </p>

            {/* Amount */}
            <div>
                <label htmlFor="topup-amount" className="mb-2 block text-center text-label-lg text-muted-foreground">
                    Amount
                </label>
                <div className="flex items-center justify-center gap-1">
                    <span className="font-display text-headline-lg font-medium text-muted-foreground">₹</span>
                    <input
                        id="topup-amount"
                        type="text"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => {
                            const next = e.target.value.replace(/[^\d.]/g, "");
                            if ((next.match(/\./g)?.length ?? 0) <= 1) setAmount(next);
                        }}
                        placeholder="0"
                        className="tabular w-full max-w-[220px] border-none bg-transparent text-center font-display
                            text-display-sm font-semibold text-foreground outline-none
                            placeholder:text-muted-foreground/40 sm:text-display-md"
                    />
                </div>
                <div className="mx-auto mt-2 h-px w-40 bg-border" />
            </div>

            {/* Quick amounts */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
                {QUICK_AMOUNTS.map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setAmount(String(value))}
                        className="state-layer rounded-full border border-border px-4 py-2 text-label-lg text-foreground
                            transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        ₹{value.toLocaleString("en-IN")}
                    </button>
                ))}
            </div>

            {/* Bank picker — radio rows read better than a select at this count. */}
            <fieldset className="mt-7">
                <legend className="mb-2 text-label-lg text-muted-foreground">Pay from</legend>

                <div className="space-y-2">
                    {SUPPORTED_BANKS.map((bank) => {
                        const selected = provider === bank.name;
                        return (
                            <label
                                key={bank.name}
                                className={`state-layer flex cursor-pointer items-center gap-3 rounded-m3-lg border p-3 transition-colors ${selected
                                    ? "border-primary bg-gpay-blue-container"
                                    : "border-border hover:bg-secondary"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="bank"
                                    value={bank.name}
                                    checked={selected}
                                    onChange={() => setProvider(bank.name)}
                                    className="sr-only"
                                />
                                <span
                                    className="gpay-tile h-10 w-10 font-display text-label-md text-white"
                                    style={{ backgroundColor: bank.tint }}
                                >
                                    {bank.short}
                                </span>
                                <span className="flex-1">
                                    <span className="block text-body-lg text-foreground">{bank.name}</span>
                                    <span className="block text-body-sm text-muted-foreground">Net banking</span>
                                </span>
                                <span
                                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selected ? "border-primary" : "border-muted-foreground/50"
                                        }`}
                                >
                                    {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <button
                type="button"
                onClick={onAddMoney}
                disabled={loading || !canSubmit}
                aria-busy={loading || undefined}
                className="state-layer mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary
                    px-6 py-4 text-label-lg text-primary-foreground shadow-m3-1 transition-all hover:shadow-m3-2
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
                {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                )}
                {loading ? "Opening bank…" : "Proceed to bank"}
            </button>
        </section>
    );
};
