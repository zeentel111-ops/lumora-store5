"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/#about", label: "من نحن" },
  { href: "/products?filter=sale", label: "العروض" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const { ids } = useWishlist();
  const { lang, toggleLang } = useLang();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-black/75 backdrop-blur-xl border-b border-line py-3.5 px-6 md:px-14"
          : "py-5 px-6 md:px-14 border-b border-transparent"
      }`}
    >
      <Link href="/" className="font-en text-2xl tracking-[6px] font-medium">
        LUM<span className="text-gold">O</span>RA
      </Link>

      <nav className="hidden md:block">
        <ul className="flex gap-10 text-[15px] font-medium">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="relative text-ivory-dim hover:text-gold transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-5">
        <button
          onClick={toggleLang}
          className="hidden sm:block border border-line rounded-full px-4 py-1.5 text-[13px] font-en text-gold-light bg-gold/[0.06]"
        >
          {lang === "ar" ? "EN" : "ع"}
        </button>
        <Link href="/products" aria-label="بحث">
          <Search size={19} />
        </Link>
        <Link href="/account" aria-label="حسابي">
          <User size={19} className={user ? "text-gold" : ""} />
        </Link>
        <Link href="/account?tab=wishlist" className="relative" aria-label="المفضلة">
          <Heart size={19} />
          {ids.length > 0 && (
            <span className="absolute -top-2 -left-2.5 bg-gold text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-en font-semibold">
              {ids.length}
            </span>
          )}
        </Link>
        <Link href="/cart" className="relative" aria-label="السلة">
          <ShoppingBag size={19} />
          {count > 0 && (
            <span className="absolute -top-2 -left-2.5 bg-gold text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-en font-semibold">
              {count}
            </span>
          )}
        </Link>
        <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="القائمة">
          <Menu size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/97 z-[200] flex flex-col p-8 md:hidden">
          <button className="self-end mb-10" onClick={() => setMobileOpen(false)}>
            <X size={26} />
          </button>
          <ul className="flex flex-col gap-7 text-xl">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
