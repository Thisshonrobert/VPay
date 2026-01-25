"use client";

import { useEffect, useState } from "react"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "ui/components/ui/command"
import { getName } from "../app/lib/action/getName"
import useDebounce from "hooks/useDebounce"
import { Check } from "lucide-react"


interface SearchProps {
    onSelect: (number: string, name: string) => void;
}

type Result = {
    id: number;
    name: string;
    number: string
}

export default function Search({ onSelect }: SearchProps) {
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState<Array<Result>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedValue || debouncedValue.trim() === "") {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const users = await getName(debouncedValue);
                setResults(Array.isArray(users) ? users : []);
            } catch (error) {
                console.error("Error fetching names:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedValue]);

    const handleSelect = (number: string, name: string) => {
        setSelectedNumber(number);
        setSearchValue(name);
        onSelect(number, name); //callback function 
    };

    return (
        <div>
            <label className="block mb-2 text-md font-medium text-gray-900">Search User</label>
            <Command className="max-w-sm rounded-lg border">
                <CommandInput
                    placeholder="Type a name to search..."
                    value={searchValue}
                    onValueChange={setSearchValue}
                />
                <CommandList>
                    {isLoading && <div className="p-2 text-sm text-gray-500">Loading...</div>}
                    {!isLoading && results.length === 0 && searchValue && (
                        <CommandEmpty>No users found.</CommandEmpty>
                    )}
                    {results.map((user) => (
                        <CommandItem
                            key={user.id}
                            value={user.name}
                            onSelect={() => handleSelect(user.number, user.name)}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <span className="font-medium">{user.name}</span>
                                    <span className="text-sm text-gray-500">{user.number}</span>
                                </div>
                                {selectedNumber === user.number && (
                                    <Check className="h-4 w-4 text-green-500" />
                                )}
                            </div>
                        </CommandItem>
                    ))}
                </CommandList>
            </Command>
        </div>
    );
}
