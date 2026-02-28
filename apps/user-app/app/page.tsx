"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { Logo } from "ui/prebuilt/Logo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className={`h-screen bg-white ${poppins.className} selection:bg-[#00baf2]/20 overflow-hidden`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-[#002970]">
            <Logo />
          </span>
        </div>

        <button
          onClick={() => router.push("/signin")}
          className="px-8 py-2.5 text-sm font-semibold text-white transition-all bg-purple-800 rounded-full hover:bg-[#009ac8] hover:shadow-lg hover:shadow-[#00baf2]/20 active:scale-95"
        >
          Login/Signup
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen pt-20 px-6 md:px-20 overflow-hidden">

        {/* Left Content */}
        <div className="flex flex-col items-start justify-center w-full md:w-1/2 pt-12 md:pt-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">


            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-8">
              Pay anyone directly from your <span className="text-purple-800">bank account</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed font-light mb-10">
              Pay anyone, everywhere. Make contactless & secure payments using VPay wallet. Plus, send & receive money from anyone.
            </p>
          </motion.div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-80 md:h-auto md:max-w-[600px] md:aspect-square"
          >
            {/* Abstract Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#00baf2]/5 to-transparent rounded-full blur-3xl -z-10" />

            <Image
              src="/paytm1.avif"
              alt="VPay Context"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>

      </section>

    </main>
  );
}
