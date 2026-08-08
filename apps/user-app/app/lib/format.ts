/**
 * Display helpers. Money is stored in paise throughout the app, so every
 * formatter here takes paise and divides at the edge.
 */

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 123456 paise -> "₹1,234.56" (Indian digit grouping). */
export function formatPaise(paise: number): string {
  return INR.format((paise ?? 0) / 100);
}

/** Same as formatPaise but drops ".00" on whole rupees, for dense lists. */
export function formatPaiseCompact(paise: number): string {
  const rupees = (paise ?? 0) / 100;
  return Number.isInteger(rupees)
    ? `₹${new Intl.NumberFormat("en-IN").format(rupees)}`
    : INR.format(rupees);
}

/** "12 Aug", or "12 Aug 2024" when the date falls outside the current year. */
export function formatTxnDate(date: Date): string {
  const d = new Date(date);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

/** "Today" / "Yesterday" / "12 Aug" — GPay-style relative day labels. */
export function formatRelativeDay(date: Date): string {
  const d = new Date(date);
  const today = new Date();
  const startOf = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const days = Math.round((startOf(today) - startOf(d)) / 86_400_000);

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return formatTxnDate(d);
}

/** Greeting that tracks the local clock, like the GPay home header. */
export function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// Google's product colours, used to tint contact avatars.
const AVATAR_COLORS = ["#1a73e8", "#1e8e3e", "#e37400", "#d93025", "#8430ce", "#007b83"];

/** Stable per-name colour so a contact keeps the same avatar tint everywhere. */
export function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < (name?.length ?? 0); i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length] as string;
}

/** First letter of a name, falling back to a neutral glyph. */
export function initial(name?: string | null): string {
  return (name ?? "").trim().charAt(0).toUpperCase() || "?";
}
