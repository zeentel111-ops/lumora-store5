"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmationPage() {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <div className="pt-40 pb-32 text-center px-6">
      <CheckCircle2 size={60} className="mx-auto mb-6 text-gold" />
      <h1 className="text-3xl font-bold mb-4">تم استلام طلبك بنجاح!</h1>
      <p className="text-ivory-dim mb-2">شكراً لثقتك بـ Lumora، سنتواصل معك قريباً لتأكيد الطلب.</p>
      {id && <p className="text-sm text-gold-dim font-en mb-8">رقم الطلب: {id}</p>}
      <div className="flex gap-4 justify-center flex-wrap">
        <Link href="/track-order" className="btn-primary">تتبع طلبك</Link>
        <Link href="/products" className="btn-ghost">متابعة التسوق</Link>
      </div>
    </div>
  );
}
