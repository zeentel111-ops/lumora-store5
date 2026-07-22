"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/products";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((orders) => {
      const map = {};
      orders.forEach((o) => {
        const key = o.customer?.phone;
        if (!key) return;
        if (!map[key]) {
          map[key] = { name: o.customer.name, phone: o.customer.phone, city: o.customer.city, orders: 0, spent: 0 };
        }
        map[key].orders += 1;
        map[key].spent += o.total || 0;
      });
      setCustomers(Object.values(map));
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">العملاء</h1>
      {loading ? (
        <p className="text-ivory-dim">جارِ التحميل...</p>
      ) : customers.length === 0 ? (
        <p className="text-ivory-dim">لا يوجد عملاء بعد.</p>
      ) : (
        <div className="border border-line rounded overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-charcoal text-ivory-dim">
              <tr>
                <th className="text-right p-4">الاسم</th>
                <th className="text-right p-4">الهاتف</th>
                <th className="text-right p-4">المدينة</th>
                <th className="text-right p-4">عدد الطلبات</th>
                <th className="text-right p-4">إجمالي الإنفاق</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.phone} className="border-t border-line">
                  <td className="p-4">{c.name}</td>
                  <td className="p-4 font-en" dir="ltr">{c.phone}</td>
                  <td className="p-4 text-ivory-dim">{c.city}</td>
                  <td className="p-4 font-en">{c.orders}</td>
                  <td className="p-4 font-en text-gold-light">${c.spent.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
