"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { MessageCircle, Instagram, Mail } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    toast.success("تم إرسال رسالتك، سنتواصل معك قريباً");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="pt-32 section-pad max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className="eyebrow justify-center mb-4">Get In Touch</div>
        <h1 className="text-4xl font-bold">تواصل معنا</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-14">
        <div>
          <div className="space-y-6 mb-10">
            <a href="https://wa.me/9630940035809" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 border border-line rounded p-5 hover:border-gold transition-colors">
              <MessageCircle className="text-gold" size={22} />
              <div>
                <div className="font-semibold mb-1">واتساب</div>
                <div className="text-sm text-ivory-dim font-en" dir="ltr">0940035809</div>
              </div>
            </a>
            <a href="https://www.instagram.com/lumora.26" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 border border-line rounded p-5 hover:border-gold transition-colors">
              <Instagram className="text-gold" size={22} />
              <div>
                <div className="font-semibold mb-1">إنستغرام</div>
                <div className="text-sm text-ivory-dim font-en">@lumora.26</div>
              </div>
            </a>
          </div>
          <div className="h-64 rounded border border-line bg-charcoal-2 flex items-center justify-center text-ivory-dim text-sm">
            خريطة Google Maps (تُضاف لاحقاً)
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-ivory-dim mb-2">الاسم</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm text-ivory-dim mb-2">البريد الإلكتروني</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm text-ivory-dim mb-2">الرسالة</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">
            <Mail size={15} /> إرسال الرسالة
          </button>
        </form>
      </div>
    </div>
  );
}
