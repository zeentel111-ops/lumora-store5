"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen relative flex items-center px-6 md:px-14 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          background:
            "radial-gradient(60% 50% at 82% 20%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(40% 40% at 10% 85%, rgba(212,175,55,0.08), transparent 60%)",
        }}
      />
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center w-full max-w-[1400px] mx-auto pt-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center md:text-right"
        >
          <div className="eyebrow justify-center md:justify-start mb-6">
            <span className="hidden md:inline-block w-[30px] h-px bg-gold" />
            Skincare Rituals · منذ 2026
          </div>
          <h1 className="text-[42px] md:text-[74px] font-bold leading-[1.15] mb-6">
            طقوس عناية{" "}
            <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1px #D4AF37" }}>
              فاخرة
            </em>
            <br />
            لبشرة تستحق الأفضل
          </h1>
          <p className="text-[17px] leading-[1.9] text-ivory-dim max-w-[480px] mx-auto md:mx-0 mb-10 font-light">
            تشكيلة Lumora من العناية بالبشرة تجمع بين مكونات نقية ونتائج علمية مثبتة، في تصميم يليق بروتينك اليومي.
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <Link href="/products" className="btn-primary">
              اكتشفي التشكيلة
              <ArrowLeft size={14} />
            </Link>
            <Link href="/about" className="btn-ghost">
              تعرفي على العلامة
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] md:h-[560px] flex items-center justify-center"
        >
          <div className="absolute w-[300px] md:w-[380px] h-[300px] md:h-[380px] rounded-full blur-[2px] animate-[float_7s_ease-in-out_infinite]"
            style={{ background: "radial-gradient(circle at 35% 30%, rgba(233,206,122,0.35), rgba(212,175,55,0.06) 55%, transparent 70%)" }}
          />
          <div className="relative w-[260px] md:w-[300px] p-8 text-center bg-gradient-to-b from-white/[0.06] to-white/[0.015] border border-line rounded backdrop-blur-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <div className="w-[90px] h-[150px] mx-auto mb-5 rounded-t-2xl rounded-b-[30px] bg-gradient-to-br from-[#2a2620] to-[#0f0e0c] border border-line relative shadow-inner">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-[26px] h-5 bg-gold-dim rounded-sm" />
            </div>
            <div className="font-en text-[13px] tracking-[2px] text-gold-light mb-1.5">GOLDEN SERUM</div>
            <div className="text-[13px] text-ivory-dim mb-3.5">سيروم مضيء بخلاصة الذهب النقي</div>
            <div className="font-en text-xl">$68.00</div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-22px); }
        }
      `}</style>
    </section>
  );
}
