"use client"

import { useId } from "react";

export const Select = ({ options, onSelect, label }: {
    onSelect: (value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
    label?: string;
}) => {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="mb-1.5 block text-label-lg text-muted-foreground">
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    id={id}
                    onChange={(e) => onSelect(e.target.value)}
                    className="w-full appearance-none rounded-m3-md border border-border bg-card px-4 py-3.5 pr-10
                        text-body-lg text-foreground outline-none transition-all duration-150
                        focus:border-primary focus:ring-1 focus:ring-primary"
                >
                    {options.map(option => <option key={option.key}>{option.value}</option>)}
                </select>

                {/* Custom chevron, since appearance-none removes the native one. */}
                <svg
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>
    );
};
