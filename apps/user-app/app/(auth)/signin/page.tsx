'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMessage } from 'hooks/useMessage';
import { Logo } from 'ui/prebuilt/Logo';

type Field = {
  id: 'name' | 'email' | 'phone' | 'password';
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  inputMode?: 'text' | 'email' | 'tel';
};

const FIELDS: Field[] = [
  { id: 'name', label: 'Full name', type: 'text', placeholder: 'Alice Kumar', autoComplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'alice@example.com', autoComplete: 'email', inputMode: 'email' },
  { id: 'phone', label: 'Mobile number', type: 'tel', placeholder: '9876543210', autoComplete: 'tel', inputMode: 'tel' },
  { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••', autoComplete: 'current-password' },
];

export default function SignInPage() {
  const router = useRouter();
  const { bark } = useMessage();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const validateInputs = () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      bark({ message: "Please fill in all fields", success: false });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      bark({ message: "Please enter a valid email address", success: false });
      return false;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(form.phone)) {
      bark({ message: "Phone number must contain only digits", success: false });
      return false;
    }

    if (form.phone.length < 10) {
      bark({ message: "Phone number must be at least 10 digits", success: false });
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (!validateInputs()) return;
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
        bark({ message: "Successfully logged in", success: true });
        router.push("/dashboard");
      } else {
        bark({ message: "Unable to login. Please enter valid credentials", success: false });
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      {/* Google's account card: generous radius, hairline border, no heavy shadow. */}
      <div className="w-full max-w-[460px] animate-rise-in rounded-m3-2xl border border-border bg-card px-6 py-10 shadow-m3-1 sm:px-12">

        <div className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-6 font-display text-headline-md font-normal text-foreground">
            Sign in
          </h1>
          <p className="mt-2 text-body-lg text-muted-foreground">
            Continue to your VPay wallet
          </p>
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
        >
          {FIELDS.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="mb-1.5 block text-label-lg text-muted-foreground"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                inputMode={field.inputMode}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={form[field.id]}
                onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                className="w-full rounded-m3-md border border-border bg-card px-4 py-3.5 text-body-lg
                  text-foreground outline-none transition-all duration-150
                  placeholder:text-muted-foreground/60
                  focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading || undefined}
            className="state-layer mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary
              px-6 py-4 text-label-lg text-primary-foreground shadow-m3-1 transition-all hover:shadow-m3-2
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
            )}
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-body-sm text-muted-foreground">
          New here? Signing in creates your wallet automatically.
        </p>
      </div>
    </div>
  );
}
