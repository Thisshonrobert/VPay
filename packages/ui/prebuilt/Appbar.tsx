"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => void,
    onSignout: () => void,
    onLogoClick: any
}

// Deterministically pick one of Google's four brand colours from the name, so a
// given user always gets the same avatar tint.
const AVATAR_COLORS = ["#1a73e8", "#1e8e3e", "#e37400", "#d93025", "#8430ce"];

function avatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length] as string;
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    onLogoClick
}: AppbarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Dismiss the account menu on outside click or Escape.
    useEffect(() => {
        if (!menuOpen) return;

        const onPointerDown = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [menuOpen]);

    const name = user?.name ?? "";
    const initial = name.trim().charAt(0).toUpperCase() || "U";

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-card/85 px-4 py-2.5 backdrop-blur-md sm:px-6">
            <button
                onClick={onLogoClick}
                className="flex items-center rounded-m3-md p-1 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Go to home"
            >
                <Logo />
            </button>

            {user ? (
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                        aria-label={`Account menu for ${name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full font-display text-title-md font-medium text-white shadow-m3-1 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        style={{ backgroundColor: avatarColor(name) }}
                    >
                        {initial}
                    </button>

                    {menuOpen && (
                        <div
                            role="menu"
                            className="absolute right-0 mt-2 w-64 origin-top-right animate-scale-in overflow-hidden rounded-m3-xl border border-border bg-card p-2 shadow-m3-3"
                        >
                            <div className="flex flex-col items-center gap-2 px-4 py-4 text-center">
                                <div
                                    className="flex h-16 w-16 items-center justify-center rounded-full font-display text-headline-sm font-medium text-white"
                                    style={{ backgroundColor: avatarColor(name) }}
                                >
                                    {initial}
                                </div>
                                <div>
                                    <p className="font-display text-title-md text-foreground">{name}</p>
                                    <p className="text-body-sm text-muted-foreground">VPay wallet</p>
                                </div>
                            </div>

                            <div className="my-1 h-px bg-border" />

                            <button
                                role="menuitem"
                                onClick={() => {
                                    setMenuOpen(false);
                                    onSignout();
                                }}
                                className="state-layer flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-label-lg text-foreground hover:bg-secondary"
                            >
                                <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={onSignin}
                    className="state-layer rounded-full bg-primary px-6 py-2.5 text-label-lg text-primary-foreground shadow-m3-1 transition-shadow hover:shadow-m3-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    Sign in
                </button>
            )}
        </header>
    );
}
