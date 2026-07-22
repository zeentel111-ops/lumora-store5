"use client";

import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search } from "lucide-react";

const STATUS_STEPS = ["جديد", "قيد التجهيز", "تم الشحن", "تم التسليم"];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    setOrder(null);
    if (!orderId.trim()) return;
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "orders", orderId.trim()));
      if (snap.exists()) {
        setOrder({ id: snap.id, ...snap.data() });
      } else {
        setError("لم يتم العثور على طلب بهذا الرقم");
      }
    } catch {
      setError("تعذر الاتصال بالخادم، حاولي مجدداً");
    } finally {
      setLoading(false);
    }
  }

  const currentStep = order ? STATUS_STEPS.indexOf(order.status) : -1;

  return (
    <div className="pt-32 section-pad max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">تتبع طلبك</h1>
      <p className="text-ivory-dim mb-10">أدخلي رقم الطلب لمعرفة حالته الحالية</p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-10">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="رقم الطلب"
          className="flex-1 bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none"
          dir="ltr"
        />
        <button type="submit" className="btn-primary shrink-0">
          <Search size={15} /> بحث
        </button>
      </form>

      {loading && <p className="text-ivory-dim">جارِ البحث...</p>}
      {error && <p className="text-gold-light">{error}</p>}

      {order && (
        <div className="border border-line rounded p-8 text-right bg-white/[0.02]">
          <div className="flex justify-between mb-8">
            {STATUS_STEPS.map((s, i) => (
              <div key={s} className="flex-1 text-center relative">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-en mb-2 ${i <= currentStep ? "bg-gold text-black" : "bg-charcoal-2 border border-line text-ivory-dim"}`}>
                  {i + 1}
                </div>
                <span className={`text-[11px] ${i <= currentStep ? "text-gold-light" : "text-ivory-dim"}`}>{s}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-ivory-dim">الإجمالي: <span className="font-en text-gold-light">${order.total?.toFixed(2)}</span></p>
        </div>
      )}
    </div>
  );
}
