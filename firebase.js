"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, updateQty, removeFromCart, applyCoupon, coupon, subtotal, discount, total } = useCart();
  const [code, setCode] = useState("");

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-32 text-center px-6">
        <h1 className="text-3xl font-bold mb-4">سلتك فارغة</h1>
        <p className="text-ivory-dim mb-8">لم تضيفي أي منتجات إلى السلة بعد.</p>
        <Link href="/products" className="btn-primary">
          تصفحي المنتجات
          <ArrowLeft size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 section-pad">
      <h1 className="text-3xl font-bold mb-10 text-center">سلة المشتريات</h1>
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.6fr_1fr] gap-10">
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-5 border border-line rounded p-5 bg-white/[0.02]">
              <div className="w-20 h-24 rounded bg-gradient-to-br from-[#2a2620] to-[#0f0e0c] border border-line shrink-0" />
              <div className="flex-1">
                <div className="font-en text-[10px] tracking-wider text-gold-dim uppercase mb-1">{item.brand}</div>
                <div className="font-semibold mb-2">{item.name}</div>
                <div className="font-en text-gold-light">${item.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center border border-line rounded">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-2.5"><Minus size={13} /></button>
                <span className="w-8 text-center font-en text-sm">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-2.5"><Plus size={13} /></button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-ivory-dim hover:text-gold">
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>

        <div className="border border-line rounded p-7 h-fit bg-white/[0.02]">
          <h3 className="font-semibold text-lg mb-6">ملخص الطلب</h3>

          <div className="flex gap-2 mb-6">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="كود الخصم"
              className="flex-1 bg-charcoal border border-line rounded px-3 py-2.5 text-sm outline-none placeholder:text-ivory-dim"
            />
            <button
              onClick={() => applyCoupon(code)}
              className="border border-gold text-gold-light px-4 rounded text-sm hover:bg-gold hover:text-black transition-colors"
            >
              تطبيق
            </button>
          </div>

          <div className="space-y-3 text-sm text-ivory-dim mb-6">
            <div className="flex justify-between">
              <span>المجموع الفرعي</span>
              <span className="font-en">${subtotal.toFixed(2)}</span>
            </div>
            {coupon && (
              <div className="flex justify-between text-gold-light">
                <span>خصم ({coupon.code})</span>
                <span className="font-en">-${discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between text-lg font-semibold border-t border-line pt-5 mb-7">
            <span>الإجمالي</span>
            <span className="font-en text-gold-light">${total.toFixed(2)}</span>
          </div>

          <Link href="/checkout" className="btn-primary w-full justify-center">
            إتمام الطلب
            <ArrowLeft size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
