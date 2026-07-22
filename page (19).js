"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/products";
import toast from "react-hot-toast";
import { Truck, Wallet } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, discount, total, coupon, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", notes: "" });
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.city || !form.address) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    setSubmitting(true);
    try {
      const ref = await createOrder({
        customer: form,
        items,
        subtotal,
        discount,
        total,
        coupon: coupon?.code || null,
        paymentMethod: payment,
      });
      toast.success("تم إرسال طلبك بنجاح!");
      clearCart();
      router.push(`/order-confirmation?id=${ref.id}`);
    } catch (err) {
      toast.error("تعذر إتمام الطلب، حاولي مجدداً");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return <div className="pt-40 text-center text-ivory-dim">سلتك فارغة. أضيفي منتجات أولاً.</div>;
  }

  return (
    <div className="pt-32 section-pad">
      <h1 className="text-3xl font-bold mb-10 text-center">إتمام الطلب</h1>
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-ivory-dim mb-2">الاسم الكامل *</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} required
                className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-sm text-ivory-dim mb-2">رقم الهاتف *</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} required
                className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" dir="ltr" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-ivory-dim mb-2">المدينة *</label>
            <input value={form.city} onChange={(e) => update("city", e.target.value)} required
              className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm text-ivory-dim mb-2">العنوان بالتفصيل *</label>
            <textarea value={form.address} onChange={(e) => update("address", e.target.value)} required rows={3}
              className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm text-ivory-dim mb-2">ملاحظات (اختياري)</label>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={2}
              className="w-full bg-charcoal border border-line rounded px-4 py-3 text-sm outline-none" />
          </div>

          <div>
            <label className="block text-sm text-ivory-dim mb-3">طريقة الدفع</label>
            <div className="grid sm:grid-cols-2 gap-4">
              <button type="button" onClick={() => setPayment("cod")}
                className={`flex items-center gap-3 border rounded p-4 text-sm transition-colors ${payment === "cod" ? "border-gold bg-gold/10 text-gold-light" : "border-line text-ivory-dim"}`}>
                <Truck size={18} /> الدفع عند الاستلام
              </button>
              <button type="button" onClick={() => setPayment("shamcash")}
                className={`flex items-center gap-3 border rounded p-4 text-sm transition-colors ${payment === "shamcash" ? "border-gold bg-gold/10 text-gold-light" : "border-line text-ivory-dim"}`}>
                <Wallet size={18} /> شام كاش (قريباً)
              </button>
            </div>
            {payment === "shamcash" && (
              <p className="text-xs text-ivory-dim mt-2">
                سيتم تفعيل الدفع عبر شام كاش عند ربط API الرسمي. سيُعتمد الطلب حالياً كدفع عند الاستلام.
              </p>
            )}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center mt-4">
            {submitting ? "جارِ إرسال الطلب..." : "تأكيد الطلب"}
          </button>
        </form>

        <div className="border border-line rounded p-7 h-fit bg-white/[0.02]">
          <h3 className="font-semibold text-lg mb-6">طلبك</h3>
          <div className="space-y-3 mb-6">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm text-ivory-dim">
                <span>{i.name} × {i.qty}</span>
                <span className="font-en">${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm text-ivory-dim border-t border-line pt-5 mb-3">
            <div className="flex justify-between"><span>المجموع الفرعي</span><span className="font-en">${subtotal.toFixed(2)}</span></div>
            {coupon && <div className="flex justify-between text-gold-light"><span>خصم</span><span className="font-en">-${discount.toFixed(2)}</span></div>}
          </div>
          <div className="flex justify-between text-lg font-semibold border-t border-line pt-4">
            <span>الإجمالي</span>
            <span className="font-en text-gold-light">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
