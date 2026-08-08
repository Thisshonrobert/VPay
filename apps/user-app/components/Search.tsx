"use client";

import { useEffect, useState } from "react"
import { getName } from "../app/lib/action/getName"
import useDebounce from "hooks/useDebounce"
import { useSession } from "next-auth/react";
import { Avatar } from "./Avatar";

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
    const { data } = useSession();

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedValue || debouncedValue.trim() === "") {
                setResults([]);
                return;
            }
            if (data?.user?.name === debouncedValue) {
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
    }, [debouncedValue, data?.user?.name]);

    const handleSelect = (number: string, name: string) => {
        setSelectedNumber(number);
        setSearchValue(name);
        onSelect(number, name);
        setResults([]);
    };

    return (
        <div>
            <label htmlFor="contact-search" className="mb-1.5 block text-label-lg text-muted-foreground">
                To
            </label>

            {/* M3 search field: fully rounded, leading icon, filled surface. */}
            <div className="relative">
                <svg
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                <input
                    id="contact-search"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search name or number"
                    autoComplete="off"
                    className="w-full rounded-full border border-border bg-secondary py-3.5 pl-12 pr-11 text-body-lg
                        text-foreground outline-none transition-all duration-150
                        placeholder:text-muted-foreground/70 focus:border-primary focus:bg-card focus:ring-1 focus:ring-primary"
                />

                {searchValue && (
                    <button
                        type="button"
                        onClick={() => { setSearchValue(""); setResults([]); }}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Results */}
            {isLoading && (
                <p className="px-2 pt-3 text-body-md text-muted-foreground">Searching…</p>
            )}

            {!isLoading && searchValue && results.length === 0 && selectedNumber === null && (
                <p className="px-2 pt-3 text-body-md text-muted-foreground">No people found.</p>
            )}

            {results.length > 0 && (
                <ul className="mt-2 animate-scale-in overflow-hidden rounded-m3-lg border border-border bg-card shadow-m3-2">
                    {results.map((user) => (
                        <li key={user.id}>
                            <button
                                type="button"
                                onClick={() => handleSelect(user.number, user.name)}
                                className="state-layer flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-secondary"
                            >
                                <Avatar name={user.name} size="sm" />
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-body-lg text-foreground">{user.name}</span>
                                    <span className="block truncate text-body-sm text-muted-foreground">{user.number}</span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
