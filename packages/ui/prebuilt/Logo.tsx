export const Logo = ({ compact = false }: { compact?: boolean }) => {
    return (
        <div className="flex items-center gap-2 select-none">
            {/* Wordmark "V" drawn as a chevron in Google's four brand colours. */}
            <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="shrink-0"
            >
                <path d="M4 7 L11 7 L16 19 L13 25 Z" fill="#4285f4" />
                <path d="M28 7 L21 7 L16 19 L19 25 Z" fill="#34a853" />
                <path d="M11 7 L21 7 L16 19 Z" fill="#fbbc04" />
                <circle cx="16" cy="25" r="3" fill="#ea4335" />
            </svg>

            {!compact && (
                <span className="font-display text-title-lg font-semibold tracking-tight text-foreground">
                    VPay
                </span>
            )}
        </div>
    );
};
