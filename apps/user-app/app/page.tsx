"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Logo } from "ui/prebuilt/Logo";

const FEATURES = [
  {
    title: "Pay any contact",
    body: "Send money to anyone on VPay in a couple of taps. Transfers settle atomically — they either complete in full or not at all.",
    tint: "bg-gpay-blue-container",
    fg: "text-gpay-blue",
    path: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5",
  },
  {
    title: "Top up from your bank",
    body: "Add money straight from a linked net-banking account. Confirmations arrive over a signed webhook the moment the bank settles.",
    tint: "bg-gpay-green-container",
    fg: "text-gpay-green",
    path: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18",
  },
  {
    title: "See where it went",
    body: "Every rupee in and out, grouped by day, with running monthly totals so nothing goes unaccounted for.",
    tint: "bg-gpay-yellow-container",
    fg: "text-gpay-yellow",
    path: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
  },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-card">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card/85 px-5 py-3 backdrop-blur-md sm:px-10">
        <Logo />
        <button
          onClick={() => router.push("/signin")}
          className="state-layer rounded-full bg-primary px-6 py-2.5 text-label-lg text-primary-foreground shadow-m3-1 transition-shadow hover:shadow-m3-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Sign in
        </button>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-10 md:grid-cols-2 md:py-24">
        <div className="animate-rise-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-gpay-blue-container px-4 py-1.5 text-label-lg text-gpay-blue">
            <span className="h-2 w-2 rounded-full bg-gpay-blue" aria-hidden="true" />
            UPI-style wallet
          </span>

          <h1 className="mt-6 font-display text-display-sm font-semibold leading-[1.08] tracking-tight text-foreground sm:text-display-md md:text-display-lg">
            Pay anyone,<br />
            <span className="text-gpay-blue">instantly.</span>
          </h1>

          <p className="mt-6 max-w-lg text-body-lg text-muted-foreground sm:text-title-md sm:font-normal">
            Move money between friends and your bank account in seconds. No queues,
            no card numbers — just a name and an amount.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/signin")}
              className="state-layer rounded-full bg-primary px-8 py-4 text-label-lg text-primary-foreground shadow-m3-1 transition-shadow hover:shadow-m3-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Get started
            </button>
            <a
              href="#features"
              className="state-layer rounded-full border border-border px-8 py-4 text-label-lg text-foreground transition-colors hover:bg-secondary"
            >
              How it works
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          {/* Soft colour wash behind the product shot. */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, #e8f0fe 0%, transparent 70%)" }}
          />
          <Image
            src="/paytm1.avif"
            alt="VPay wallet on a phone"
            width={600}
            height={600}
            priority
            className="h-auto w-full object-contain drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-background px-5 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl font-display text-headline-lg font-medium tracking-tight text-foreground">
            Everything a wallet should do, and nothing it shouldn't.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <article
                key={feature.title}
                style={{ animationDelay: `${i * 90}ms` }}
                className="animate-rise-in rounded-m3-xl border border-border bg-card p-6 shadow-m3-1"
              >
                <span className={`gpay-tile h-14 w-14 ${feature.tint} ${feature.fg}`}>
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.path} />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-title-lg text-foreground">{feature.title}</h3>
                <p className="mt-2 text-body-lg text-muted-foreground">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-5 py-10 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Logo />
          <p className="text-body-sm text-muted-foreground">
            Built as a portfolio project. Not a licensed payment institution.
          </p>
        </div>
      </footer>
    </main>
  );
}
