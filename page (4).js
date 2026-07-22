"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "@/lib/products";
import toast from "react-hot-toast";

const STATUSES = ["جديد", "قيد التجهيز", "تم الشحن", "تم التسليم"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("الكل");

  useEffect(() => { refresh(); }, []);

  async function refresh() {
    setLoading(true);
    setOrders(await getOrders());
    setLoading(false);
  }

  async function handleStatusChange(id, status) {
    await updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success("تم تحديث حالة الطلب");
  }

  const filtered = filter === "الكل" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">الطلبات</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-charcoal border border-line rounded px-4 py-2.5 text-sm outline-none">
          <option>الكل</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-ivory-dim">جارِ التحميل...</p>
      ) : filtered.length === 0 ? (
        <p className="text-ivory-dim">لا توجد طلبات.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((o) => (
            <div key={o.id} className="border border-line rounded p-5 bg-white/[0.02]">
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                <div>
                  <div className="font-en text-gold-dim text-sm mb-1">#{o.id.slice(0, 8)}</div>
                  <div className="font-medium">{o.customer?.name}</div>
                  <div className="text-xs text-ivory-dim font-en" dir="ltr">{o.customer?.phone}</div>
                </div>
                <div className="text-left">
                  <div className="font-en text-lg text-gold-light mb-2">${o.total?.toFixed(2)}</div>
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className="bg-black border border-line rounded px-3 py-1.5 text-xs outline-none"
                  >
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="text-xs text-ivory-dim border-t border-line pt-3">
                {o.customer?.city} — {o.customer?.address}
              </div>
              <div className="text-xs text-ivory-dim mt-2">
                {o.items?.map((i) => `${i.name} ×${i.qty}`).join("، ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
