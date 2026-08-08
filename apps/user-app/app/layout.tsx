import 'ui/styles/globals.css'
import type { Metadata, Viewport } from "next";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roboto, Outfit } from 'next/font/google'

export const metadata: Metadata = {
  title: "VPay — Pay anyone, instantly",
  description: "A UPI-style wallet for instant payments, bank transfers and split-free P2P money movement.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

// Roboto is Google's UI typeface — body copy, labels, table data.
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Google Sans is proprietary; Outfit is the closest open geometric match and
// carries the headings and currency figures.
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={`${roboto.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <AppbarClient />
          {children}
          <ToastContainer
            position="top-center"
            autoClose={2800}
            hideProgressBar
            closeButton={false}
            toastClassName="!rounded-m3-md !shadow-m3-2 !font-sans !text-body-md"
          />
        </Providers>
      </body>
    </html>
  );
}
