"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { ids, toggleWishlist } = useWishlist();
  const isFav = ids.includes(product.id);

  return (
    <div className="card group">
      <Link href={`/products/${product.id}`}>
        <div className="h-[280px] relative flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.10),transparent_65%)] bg-charcoal-2">
          {product.isNew && (
            <span className="absolute top-3.5 right-3.5 font-en text-[10px] tracking-wider px-2.5 py-1 rounded-sm uppercase bg-gold/[0.14] text-gold-light border border-line">
              جديد
            </span>
          )}
          {product.oldPrice && (
            <span className="absolute top-3.5 right-3.5 font-en text-[10px] tracking-wider px-2.5 py-1 rounded-sm uppercase bg-gold text-black font-semibold">
              خصم
            </span>
          )}
          <div className="w-[78px] h-[130px] rounded-t-xl rounded-b-[26px] bg-gradient-to-br from-[#2a2620] to-[#0f0e0c] border border-line shadow-inner" />
        </div>
      </Link>

      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3.5 left-3.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur border border-line flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-1.5 group-hover:translate-y-0 transition-all"
        aria-label="أضف للمفضلة"
      >
        <Heart size={15} fill={isFav ? "#D4AF37" : "none"} color={isFav ? "#D4AF37" : "#F7F5F2"} />
      </button>

      <button
        onClick={() => addToCart(product)}
        className="absolute right-0 left-0 bottom-0 py-3 text-center bg-gold/95 text-black text-[13px] font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-400 cursor-pointer"
      >
        إضافة سريعة للسلة
      </button>

      <div className="p-5 pb-6">
        <div className="font-en text-[10px] tracking-[2px] text-gold-dim uppercase mb-2">{product.brand}</div>
        <Link href={`/products/${product.id}`}>
          <div className="text-base font-semibold mb-1.5 hover:text-gold-light transition-colors">{product.name}</div>
        </Link>
        <p className="text-[12.5px] text-ivory-dim mb-3.5 font-light line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="font-en text-[17px] text-gold-light font-medium">
            ${product.price.toFixed(2)}
            {product.oldPrice && (
              <s className="text-ivory-dim text-[13px] mr-2 font-light">${product.oldPrice.toFixed(2)}</s>
            )}
          </div>
          <div className="flex items-center gap-0.5 text-gold text-xs">
            <Star size={12} fill="#D4AF37" />
            {product.rating}
          </div>
        </div>
      </div>
    </div>
  );
}
