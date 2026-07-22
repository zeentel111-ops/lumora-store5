"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "لوحة القيادة", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/admin/customers", label: "العملاء", icon: Users },
];

export default function AdminLayout({ children }) {
  const { user, isAdmin, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/login");
    }
  }, [loading, user, isAdmin, router]);

  if (loading || !user || !isAdmin) {
    return <div className="pt-40 text-center text-ivory-dim">جارِ التحقق من الصلاحيات...</div>;
  }

  return (
    <div className="pt-24 min-h-screen flex">
      <aside className="w-64 border-l border-line px-5 py-8 hidden md:block shrink-0">
        <div className="font-en text-lg tracking-[4px] mb-10 px-2">
          LUM<span className="text-gold">O</span>RA <span className="text-xs text-ivory-dim block font-ar tracking-normal mt-1">لوحة التحكم</span>
        </div>
        <nav className="space-y-1">
          {LINKS.map((l) => {
            const Icon = l.icon;
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 px-3 py-3 rounded text-sm transition-colors ${
                  active ? "bg-gold/10 text-gold-light border border-line" : "text-ivory-dim hover:text-ivory"
                }`}
              >
                <Icon size={16} /> {l.label}
              </Link>
            );
          })}
          <button onClick={logout} className="flex items-center gap-3 px-3 py-3 rounded text-sm text-ivory-dim hover:text-gold w-full mt-6">
            <LogOut size={16} /> تسجيل الخروج
          </button>
        </nav>
      </aside>
      <div className="flex-1 p-6 md:p-10">{children}</div>
    </div>
  );
}
