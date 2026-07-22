"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const ok = await loginWithEmail(email, password);
    setLoading(false);
    if (ok) router.push("/account");
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-sm mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">تسجيل الدخول</h1>
      <form onSubmit={handleSubmit} className="space-y-5 mb-6">
        <input type="email" required placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" dir="ltr" />
        <input type="password" required placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" dir="ltr" />
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          {loading ? "جارِ الدخول..." : "دخول"}
        </button>
      </form>
      <button onClick={loginWithGoogle} className="w-full border border-line rounded py-3 text-sm hover:border-gold transition-colors mb-6">
        الدخول عبر Google
      </button>
      <p className="text-center text-sm text-ivory-dim">
        ليس لديك حساب؟ <Link href="/signup" className="text-gold hover:underline">إنشاء حساب جديد</Link>
      </p>
    </div>
  );
}
