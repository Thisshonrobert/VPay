"use client";

import {Button,Card,Center,TextInput}from "ui/prebuilt/index"
import { useState } from "react";
import { p2ptransfer } from "../app/lib/action/p2ptransfer";

export const SendCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(0);
  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              label={"Number"}
              placeholder={"Number"}
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              label={"Amount"}
              placeholder={"Amount"}
              onChange={(value) => {
                setAmount(Number(value));
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async() => {
                   await p2ptransfer(number, amount * 100);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};
