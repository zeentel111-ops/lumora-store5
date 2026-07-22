"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    toast.success("تم الاشتراك بنجاح، شكراً لانضمامك إلى Lumora");
    setEmail("");
  }

  return (
    <div className="max-w-[900px] mx-auto text-center border-y border-line py-20 px-6">
      <div className="eyebrow justify-center mb-4">Join The Ritual</div>
      <h2 className="text-3xl md:text-[42px] font-bold mb-4">اشتركي في نشرتنا البريدية</h2>
      <p className="text-ivory-dim font-light mb-9">كوني أول من يعرف عن المنتجات الجديدة والعروض الحصرية</p>
      <form onSubmit={handleSubmit} className="flex max-w-[460px] mx-auto border-b border-gold-dim pb-2.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="بريدك الإلكتروني"
          className="flex-1 bg-transparent outline-none text-ivory placeholder:text-ivory-dim text-sm"
        />
        <button type="submit" className="text-gold font-semibold flex items-center gap-1.5">
          اشتركي
          <ArrowLeft size={14} />
        </button>
      </form>
    </div>
  );
}
