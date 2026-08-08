import { avatarColor, initial } from "app/lib/format";

const SIZES = {
  sm: "h-9 w-9 text-body-md",
  md: "h-11 w-11 text-title-md",
  lg: "h-14 w-14 text-title-lg",
} as const;

/** Circular initial-avatar tinted deterministically from the contact's name. */
export function Avatar({
  name,
  size = "md",
  className = "",
}: {
  name?: string | null;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-medium text-white ${SIZES[size]} ${className}`}
      style={{ backgroundColor: avatarColor(name ?? "") }}
      aria-hidden="true"
    >
      {initial(name)}
    </div>
  );
}
