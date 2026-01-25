"use client"

import { Button, Card, Select, TextInput } from "ui/prebuilt/index";

import { useState } from "react";
import { CreateOnRampTxn } from "../app/lib/action/CreateOnRampTxn";
import { useMessage } from "hooks/useMessage";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    // redirectUrl: "https://netbanking.hdfcbank.com"
}];

export const AddMoney = () => {
    
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);
    const [latestToken, setLatestToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const { bark } = useMessage();



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
                    setProvider(selectedBank?.name || "");
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />
                <div className="flex justify-center pt-4">
                    <Button disabled={loading}
                        onClick={async () => {
                            console.log("add money clicked")
                            setLoading(true)
                            if (amount <= 0) {

                                bark({ message: "Enter valid Amount", success: false });
                                return
                            }
                            const response = await CreateOnRampTxn(provider, (amount * 100));
                            console.log(response.message)
                            console.log(response.paymentToken)
                            console.log(response.redirectUrl)

                            if (response?.paymentToken) {
                                setLatestToken(response.paymentToken);
                            }
                            if (response.redirectUrl) {
                                window.open(response.redirectUrl, "_blank", "noopener,noreferrer,width=600,height=700");
                            }
                            setLoading(false)
                        }}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    </div>


};