import  'ui/styles/globals.css'
// import 'ui/styles/output.css'
import type { Metadata } from "next";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import { Theme } from "@radix-ui/themes";



export const metadata: Metadata = {
  title: "VPay",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body >
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <Theme>
            <AppbarClient />
            {children}
            </Theme>
          </div>
        </body>
      </Providers>
    </html>
  );
}
