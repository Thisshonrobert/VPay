"use client"
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Appbar } from "ui/prebuilt/index";

// Routes that render their own full-bleed chrome and shouldn't show the app bar.
const BARE_ROUTES = ["/signin", "/", "/bankfrontend", "/success"];

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (BARE_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <Appbar
      onLogoClick={() => router.push("/dashboard")}
      onSignin={() => router.push("/signin")}
      onSignout={async () => {
        await signOut({ redirect: false });
        router.push("/signin");
      }}
      user={session.data?.user}
    />
  );
}
