"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { getAllProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const TABS = [
  { id: "orders", label: "طلباتي" },
  { id: "wishlist", label: "المفضلة" },
  { id: "profile", label: "بياناتي" },
];

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const { ids } = useWishlist();
  const params = useSearchParams();
  const [tab, setTab] = useState(params.get("tab") || "orders");
  const [orders, setOrders] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "orders"), where("customer.email", "==", user.email));
      getDocs(q).then((snap) => setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })))).catch(() => setOrders([]));
    }
  }, [user]);

  useEffect(() => {
    getAllProducts().then((all) => setWishlistProducts(all.filter((p) => ids.includes(p.id))));
  }, [ids]);

  if (loading) return <div className="pt-40 text-center text-ivory-dim">جاري التحميل...</div>;

  if (!user) {
    return (
      <div className="pt-40 pb-24 text-center px-6">
        <h1 className="text-2xl font-bold mb-4">سجّلي الدخول لعرض حسابك</h1>
        <Link href="/login" className="btn-primary">تسجيل الدخول</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 section-pad max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold mb-1">مرحباً، {user.displayName || "عميلة Lumora"}</h1>
          <p className="text-sm text-ivory-dim">{user.email}</p>
        </div>
        <button onClick={logout} className="text-sm text-gold hover:underline">تسجيل الخروج</button>
      </div>

      <div className="flex gap-8 border-b border-line mb-10">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`pb-4 text-sm ${tab === t.id ? "text-gold border-b-2 border-gold" : "text-ivory-dim"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 && <p className="text-ivory-dim text-sm">لا يوجد طلبات سابقة بعد.</p>}
          {orders.map((o) => (
            <div key={o.id} className="border border-line rounded p-5 flex justify-between items-center text-sm">
              <div>
                <div className="font-en text-gold-dim mb-1">#{o.id.slice(0, 8)}</div>
                <div className="text-ivory-dim">{o.status}</div>
              </div>
              <div className="font-en text-gold-light">${o.total?.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "wishlist" && <ProductGrid products={wishlistProducts} />}

      {tab === "profile" && (
        <div className="max-w-sm space-y-4 text-sm">
          <div>
            <label className="block text-ivory-dim mb-2">الاسم</label>
            <input defaultValue={user.displayName || ""} className="w-full bg-charcoal border border-line rounded px-4 py-3 outline-none" />
          </div>
          <div>
            <label className="block text-ivory-dim mb-2">البريد الإلكتروني</label>
            <input defaultValue={user.email} disabled className="w-full bg-charcoal border border-line rounded px-4 py-3 outline-none opacity-60" dir="ltr" />
          </div>
          <button className="btn-primary">حفظ التعديلات</button>
        </div>
      )}
    </div>
  );
}
