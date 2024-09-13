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
    const [provider,setProvider] = useState(SUPPORTED_BANKS[0]?.name||"");
    const [amount,setAmount] = useState(0);
    return <Card title="Add Money to Wallet">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")

        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async() => {
                await CreateOnRampTxn(provider, (amount * 100));
                window.location.href = redirectUrl || "";
                setTimeout(()=>window.location.reload(),5000)
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}