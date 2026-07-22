"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const { signUpWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const ok = await signUpWithEmail(form.name, form.email, form.password);
    setLoading(false);
    if (ok) router.push("/account");
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-sm mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">إنشاء حساب جديد</h1>
      <form onSubmit={handleSubmit} className="space-y-5 mb-6">
        <input required placeholder="الاسم الكامل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" />
        <input type="email" required placeholder="البريد الإلكتروني" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" dir="ltr" />
        <input type="password" required placeholder="كلمة المرور" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" dir="ltr" />
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          {loading ? "جارِ الإنشاء..." : "إنشاء الحساب"}
        </button>
      </form>
      <button onClick={loginWithGoogle} className="w-full border border-line rounded py-3 text-sm hover:border-gold transition-colors mb-6">
        التسجيل عبر Google
      </button>
      <p className="text-center text-sm text-ivory-dim">
        لديك حساب بالفعل؟ <Link href="/login" className="text-gold hover:underline">تسجيل الدخول</Link>
      </p>
    </div>
  );
}
