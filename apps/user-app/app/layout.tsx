import  'ui/styles/globals.css'
// import 'ui/styles/output.css'
import type { Metadata } from "next";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from 'next/font/google'
export const metadata: Metadata = {
  title: "VPay",
  description: "Simple wallet app",
};
const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <Theme>
            <AppbarClient />
            {children}
            </Theme>
          </div>
        </body>
        <ToastContainer />
      </Providers>
    </html>
  );
}
