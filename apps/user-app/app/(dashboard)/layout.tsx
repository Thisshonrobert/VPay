import { BottomNav, NavRail } from "@components/Navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex min-h-[calc(100vh-61px)] bg-background">
      <NavRail />

      {/* pb-24 clears the mobile bottom nav; md resets it. */}
      <main className="w-full flex-1 pb-24 md:pb-8">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
