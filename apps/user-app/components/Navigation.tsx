"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

type NavItem = {
    href: string;
    label: string;
    icon: (filled: boolean) => React.ReactNode;
};

/* Material Symbols-style icons: outlined when inactive, filled when active —
   the same affordance Google Pay uses to mark the current destination. */
const NAV_ITEMS: NavItem[] = [
    {
        href: "/dashboard",
        label: "Home",
        icon: (filled) =>
            filled ? (
                <path d="M11.03 2.59a1.5 1.5 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-3.75a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v4.5a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363Z" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
            ),
    },
    {
        href: "/p2p",
        label: "Pay",
        icon: (filled) =>
            filled ? (
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.5 60.5 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.5 60.5 0 0 0 3.478 2.404Z" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            ),
    },
    {
        href: "/transfer",
        label: "Add money",
        icon: (filled) =>
            filled ? (
                <path d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Zm0 3a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            ),
    },
    {
        href: "/transactions",
        label: "Activity",
        icon: (filled) =>
            filled ? (
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            ),
    },
];

function NavIcon({ item, active }: { item: NavItem; active: boolean }) {
    return (
        <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill={active ? "currentColor" : "none"}
            stroke={active ? "none" : "currentColor"}
            strokeWidth="1.6"
            aria-hidden="true"
        >
            {item.icon(active)}
        </svg>
    );
}

/** Persistent navigation rail — desktop only. */
export function NavRail() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <nav
            aria-label="Main"
            className="sticky top-[61px] hidden h-[calc(100vh-61px)] w-[88px] shrink-0 flex-col items-center gap-1 border-r border-border bg-card py-6 md:flex"
        >
            {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                    <button
                        key={item.href}
                        onClick={() => router.push(item.href)}
                        aria-current={active ? "page" : undefined}
                        className="group flex w-full flex-col items-center gap-1 py-2 focus-visible:outline-none"
                    >
                        {/* The active-indicator pill is the core M3 nav signature. */}
                        <span
                            className={`state-layer flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-200 ${active
                                ? "bg-gpay-blue-container text-gpay-blue"
                                : "text-muted-foreground group-hover:bg-secondary"
                                }`}
                        >
                            <NavIcon item={item} active={active} />
                        </span>
                        <span
                            className={`text-label-md ${active ? "text-gpay-blue" : "text-muted-foreground"}`}
                        >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}

/** Bottom navigation bar — mobile only, mirroring the GPay/Paytm pattern. */
export function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <nav
            aria-label="Main"
            className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch justify-around border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
        >
            {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                    <button
                        key={item.href}
                        onClick={() => router.push(item.href)}
                        aria-current={active ? "page" : undefined}
                        className="group flex flex-1 flex-col items-center gap-1 py-2.5 focus-visible:outline-none"
                    >
                        <span
                            className={`state-layer flex h-8 w-16 items-center justify-center rounded-full transition-colors duration-200 ${active
                                ? "bg-gpay-blue-container text-gpay-blue"
                                : "text-muted-foreground"
                                }`}
                        >
                            <NavIcon item={item} active={active} />
                        </span>
                        <span
                            className={`text-label-md ${active ? "text-gpay-blue" : "text-muted-foreground"}`}
                        >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}
