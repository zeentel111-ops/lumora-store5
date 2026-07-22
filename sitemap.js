"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAllProducts, getOrders } from "@/lib/products";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, customers: 0, revenue: 0 });
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const [products, orders] = await Promise.all([getAllProducts(), getOrders()]);
      let customersSet = new Set(orders.map((o) => o.customer?.phone).filter(Boolean));
      const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
      setStats({ products: products.length, orders: orders.length, customers: customersSet.size, revenue });
      setTopProducts([...products].sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0)).slice(0, 5));
    }
    load();
  }, []);

  const cards = [
    { label: "إجمالي الطلبات", value: stats.orders, icon: ShoppingCart },
    { label: "الأرباح", value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign },
    { label: "عدد العملاء", value: stats.customers, icon: Users },
    { label: "عدد المنتجات", value: stats.products, icon: Package },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">لوحة القيادة</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="border border-line rounded p-6 bg-white/[0.02]">
              <Icon size={20} className="text-gold mb-4" />
              <div className="font-en text-2xl font-semibold mb-1">{c.value}</div>
              <div className="text-xs text-ivory-dim">{c.label}</div>
            </div>
          );
        })}
      </div>

      <div className="border border-line rounded p-6 bg-white/[0.02]">
        <h3 className="font-semibold mb-5">المنتجات الأكثر مبيعاً</h3>
        <div className="space-y-3">
          {topProducts.map((p) => (
            <div key={p.id} className="flex justify-between text-sm border-b border-line pb-3">
              <span>{p.name}</span>
              <span className="font-en text-gold-light">${p.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
