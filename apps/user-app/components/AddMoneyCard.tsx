"use client"

import { Button, Card, Select, TextInput } from "ui/prebuilt/index";

import { useState } from "react";
import { CreateOnRampTxn } from "../app/lib/action/CreateOnRampTxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);
    const [latestToken, setLatestToken] = useState<string | null>(null);
    const [copyLabel, setCopyLabel] = useState("Copy token");

    const handleCopy = () => {
        if (!latestToken) {
            setCopyLabel("No token yet");
            setTimeout(() => setCopyLabel("Copy token"), 2000);
            return;
        }
        navigator.clipboard.writeText(latestToken).then(() => {
            setCopyLabel("Copied!");
            setTimeout(() => setCopyLabel("Copy token"), 2000);
        }).catch((err) => {
            console.error("Unable to copy token", err);
            setCopyLabel("Copy failed");
            setTimeout(() => setCopyLabel("Copy token"), 2000);
        });
    };

    return <div className="space-y-6">
        <Card title="Add Money to Wallet">
            <div className="w-full">
                <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                    setAmount(Number(value));
                }} />
                <div className="py-4 text-left">
                    Bank
                </div>
                <Select onSelect={(value) => {
                    const selectedBank = SUPPORTED_BANKS.find(x => x.name === value);
                    setRedirectUrl(selectedBank?.redirectUrl || "");
                    setProvider(selectedBank?.name || "");
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />
                <div className="flex justify-center pt-4">
                    <Button onClick={async () => {
                        const response = await CreateOnRampTxn(provider, (amount * 100));
                        if (response?.token) {
                            setLatestToken(response.token);
                        }
                        if (redirectUrl) {
                            window.open(redirectUrl, "_blank", "noopener,noreferrer,width=600,height=700");
                        }
                    }}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
        <Card  title={
    <>
      As the Bank API is not available, copy this token and test at{" "}
      <a
        href="https://vpaybankwebhook.starzc.com/api-docs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        vpaybankwebhook.starzc.com/api-docs
      </a>
    </>
  }>
            <div className="space-y-4">
                <div className="pt-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Most recent onramp token</label>
                    <input
                        readOnly
                        value={latestToken ?? ""}
                        placeholder="Create a transaction to generate a token"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleCopy}>
                        {copyLabel}
                    </Button>
                </div>
            </div>
        </Card>
    </div>;
};