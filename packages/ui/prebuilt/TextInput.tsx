"use client"

import { useId } from "react";

export const TextInput = ({
    placeholder,
    onChange,
    label,
    value,
    type = "text",
    inputMode,
    prefix,
    helperText,
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    value?: string;
    type?: string;
    inputMode?: "text" | "numeric" | "decimal" | "tel";
    /** Leading adornment, e.g. a ₹ sign on amount fields. */
    prefix?: string;
    helperText?: string;
}) => {
    const id = useId();

    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="mb-1.5 block text-label-lg text-muted-foreground"
            >
                {label}
            </label>

            {/* M3 outlined text field: 1px resting border thickening to 2px on focus. */}
            <div className="relative flex items-center">
                {prefix && (
                    <span className="pointer-events-none absolute left-4 font-display text-title-lg text-muted-foreground">
                        {prefix}
                    </span>
                )}
                <input
                    id={id}
                    type={type}
                    inputMode={inputMode}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full rounded-m3-md border border-border bg-card py-3.5 text-body-lg text-foreground
                        outline-none transition-all duration-150 placeholder:text-muted-foreground/60
                        focus:border-primary focus:ring-1 focus:ring-primary
                        ${prefix ? "pl-10 pr-4" : "px-4"}`}
                />
            </div>

            {helperText && (
                <p className="mt-1.5 px-1 text-body-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    );
};
