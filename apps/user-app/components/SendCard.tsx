"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { CreateOnRampTxn } from "../app/lib/action/CreateOnRampTxn";



export const SendCard = () => {
    const [number,setNumber] = useState("");
    const [amount,setAmount] = useState(0)
    return (
        <div className="h-[90vh]">
        <Center>
    <Card title="Send">
    <div className="min-w-72 pt-2">
    <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setNumber(value)
        }} />
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value))
        }} />
         <div className="pt-4 flex justify-center">
                        <Button onClick={() => {

                        }}>Send</Button>
                    </div>
    </div>
</Card>
</Center>
</div>
)
}