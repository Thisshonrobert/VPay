"use client";

import { useRouter } from "next/navigation";

type Action = {
    href: string;
    label: string;
    tint: string;
    fg: string;
    path: string;
};

/* The circular pastel tile + line icon + short label is the most recognisable
   element of the Google Pay home screen. */
const ACTIONS: Action[] = [
    {
        href: "/p2p",
        label: "Pay contact",
        tint: "bg-gpay-blue-container",
        fg: "text-gpay-blue",
        path: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
    },
    {
        href: "/transfer",
        label: "Add money",
        tint: "bg-gpay-green-container",
        fg: "text-gpay-green",
        path: "M12 6v12m6-6H6",
    },
    {
        href: "/transfer",
        label: "Bank transfer",
        tint: "bg-gpay-yellow-container",
        fg: "text-gpay-yellow",
        path: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12.75 6.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z",
    },
    {
        href: "/transactions",
        label: "Activity",
        tint: "bg-gpay-red-container",
        fg: "text-gpay-red",
        path: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.06 12.06 0 0 1 16.5 7.605",
    },
];

export function QuickActions() {
    const router = useRouter();

    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {ACTIONS.map((action, i) => (
                <button
                    key={action.label}
                    onClick={() => router.push(action.href)}
                    style={{ animationDelay: `${i * 60}ms` }}
                    className="group flex animate-rise-in flex-col items-center gap-2 rounded-m3-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <span
                        className={`gpay-tile h-14 w-14 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:h-16 sm:w-16 ${action.tint} ${action.fg}`}
                    >
                        <svg
                            className="h-6 w-6 sm:h-7 sm:w-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d={action.path} />
                        </svg>
                    </span>
                    <span className="text-center text-label-md leading-tight text-foreground">
                        {action.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
