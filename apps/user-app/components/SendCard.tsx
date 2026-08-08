"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { p2ptransfer } from "../app/lib/action/p2ptransfer";
import { useMessage } from "hooks/useMessage";
import Search from "./Search";
import { Avatar } from "./Avatar";

// Common top-up values, mirroring the chips on GPay's amount screen.
const QUICK_AMOUNTS = [100, 500, 1000, 2000];

export const SendCard = () => {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { bark } = useMessage();

  const handleUserSelect = (number: string, name: string) => {
    setSelectedNumber(number);
    setSelectedName(name);
  };

  const numericAmount = Number(amount);
  const canSend = Boolean(selectedNumber) && numericAmount > 0 && !Number.isNaN(numericAmount);

  const onSend = async () => {
    if (!selectedNumber) {
      bark({ message: "Please select a person first", success: false });
      return;
    }
    if (!canSend) {
      bark({ message: "Please enter a valid amount", success: false });
      return;
    }

    setLoading(true);
    try {
      const response = await p2ptransfer(selectedNumber, numericAmount * 100);
      if (response.status === "success") {
        bark({ message: response.message, success: true });
        // Clear the form and pull fresh balances/history from the server.
        setAmount("");
        setSelectedNumber(null);
        setSelectedName(null);
        router.refresh();
      } else {
        bark({ message: response.message, success: false });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full rounded-m3-2xl border border-border bg-card p-5 shadow-m3-1 sm:p-7">
      <h2 className="mb-5 font-display text-title-lg text-foreground">Send money</h2>

      <Search onSelect={handleUserSelect} />

      {/* Selected recipient */}
      {selectedName && (
        <div className="mt-4 flex animate-scale-in items-center gap-3 rounded-m3-lg bg-gpay-blue-container p-3">
          <Avatar name={selectedName} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-body-lg font-medium text-foreground">{selectedName}</p>
            <p className="truncate text-body-sm text-muted-foreground">{selectedNumber}</p>
          </div>
          <button
            type="button"
            onClick={() => { setSelectedName(null); setSelectedNumber(null); }}
            aria-label="Remove recipient"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-black/5"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Amount — oversized and centred, the way payment apps present it. */}
      <div className="mt-7">
        <label htmlFor="amount" className="mb-2 block text-center text-label-lg text-muted-foreground">
          Amount
        </label>
        <div className="flex items-center justify-center gap-1">
          <span className="font-display text-headline-lg font-medium text-muted-foreground">₹</span>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            value={amount}
            // Digits and at most one decimal point.
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

      <button
        type="button"
        onClick={onSend}
        disabled={loading || !canSend}
        aria-busy={loading || undefined}
        className="state-layer mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary
          px-6 py-4 text-label-lg text-primary-foreground shadow-m3-1 transition-all hover:shadow-m3-2
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
        )}
        {loading ? "Sending…" : "Pay securely"}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-body-sm text-muted-foreground">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        Transfers are atomic and encrypted end to end
      </p>
    </section>
  );
};
