"use client";

import { Button, Card, Center, TextInput } from "ui/prebuilt/index"
import { useState } from "react";
import { p2ptransfer } from "../app/lib/action/p2ptransfer";
import { useMessage } from "hooks/useMessage";
import Search from "./Search";
 

export const SendCard = () => {
  const [amount, setAmount] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const { bark } = useMessage();
  


  const handleUserSelect = (number: string, name: string) => {
    setSelectedNumber(number);
    setSelectedName(name);
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send" >
          <div className="min-w-72 pt-2">
            <Search onSelect={handleUserSelect} />
            
            {selectedName && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm font-medium">
                  <span className="text-gray-600">Selected: </span>
                  <span className="text-blue-600">{selectedName}</span>
                </p>
                <p className="text-xs text-gray-500">{selectedNumber}</p>
              </div>
            )}

            <div className="mt-4">
              <TextInput
                label={"Amount"}
                placeholder={"Amount"}
                onChange={(value) => {
                  setAmount(Number(value));
                }}
              />
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  if (!selectedNumber) {
                    bark({ message: "Please select a user first", success: false });
                    return;
                  }
                  if (amount <= 0 || !amount || isNaN(amount)) {
                    bark({ message: "Please enter a valid amount", success: false });
                    return;
                  }
                  
                  const response = await p2ptransfer(selectedNumber, amount * 100);
                  if (response.status === "success") {
                    bark({ message: response.message, success: true });
                    
                  }
                  else {
                    bark({ message: response.message, success: false });
                  }
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
