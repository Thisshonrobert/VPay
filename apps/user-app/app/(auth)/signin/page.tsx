'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label } from 'ui';
import { motion } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';
import { useMessage } from 'hooks/useMessage';
import { Logo } from 'ui/prebuilt/Logo';

// Load fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function SignInPage() {
  const router = useRouter();
  const { bark } = useMessage();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        redirect: false,
        callbackUrl: "/dashboard"
      });

      if (response?.ok) {
        bark({ message: "Successfully Logged In", success: true });
        router.push("/dashboard");
      } else {
        bark({
          message: "Unable to login. Please enter valid credentials",
          success: false,
        });
        console.error("Login failed:", response?.error);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      bark({ message: "An error occurred during login", success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full h-screen flex flex-col md:flex-row bg-white overflow-hidden ${inter.variable} ${playfair.variable} font-sans`}>

      {/* Left Panel - Image & Abstract Art */}
      <div className="relative w-full md:w-1/2 h-full bg-black flex flex-col justify-end p-8 md:p-16 overflow-hidden">
        {/* Background Image */}
        <img
          src="/signinPage.avif"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          alt="Background"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-white space-y-4 max-w-lg mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-2 text-sm uppercase tracking-widest text-white/70 mb-2">
            <span className="h-[1px] w-8 bg-white/50 inline-block"></span>
            <span>Digital Wallet Experience</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-medium leading-tight tracking-tight">
            Send Money <br />
            <span className="italic">Instantly</span> <br />
            With Confidence
          </h1>

          <p className="text-white/70 text-lg font-light pt-4 border-l-2 border-white/30 pl-4 mt-6">
            Experience payments smarter with VPay's secure infrastructure, instant transfers,
            and seamless integration — designed to simplify your financial life.
          </p>
        </motion.div>

      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col items-center justify-center p-8 md:p-12 relative animate-in fade-in slide-in-from-right-10 duration-700">

        {/* Brand/Logo Placeholder */}
        

        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-serif font-medium text-gray-900">Welcome</h2>
            <p className="text-gray-500 font-light">
              Sign in to access your wallet.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Alice"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-slate-800 transition-colors"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="alice@example.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-slate-800 transition-colors"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Number</Label>
              <Input
                id="phone"
                type="text"
                placeholder="1234567890"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-slate-800 transition-colors"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-slate-800 transition-colors"
              />
            </div>

            <Button
              variant="default"
              onClick={onSubmit}
              disabled={loading}
              className="w-full h-14 text-base font-medium rounded-xl bg-black text-white hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-3 mt-6"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Signup / Login</span>
              )}
            </Button>

            <p className="text-center text-xs text-gray-400 mt-4">
              By logging in you are accepting terms and conditions
            </p>
          </div>
        </div>

        {/* Footer info/links - Optional, keeping somewhat minimal as per VPay style */}
        <div className="absolute bottom-6 text-xs text-gray-300 flex space-x-4">
          <span>Terms</span>
          <span>Privacy</span>
        </div>
      </div>
    </div>
  );
}

