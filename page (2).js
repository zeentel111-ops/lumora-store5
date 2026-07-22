import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "سارة أحمد",
    city: "DAMASCUS",
    text: "بشرتي تغيرت تماماً بعد استخدام سيروم Lumora، الملمس فاخر جداً والنتيجة واضحة من أول أسبوعين.",
  },
  {
    name: "ريم خالد",
    city: "ALEPPO",
    text: "التغليف والتجربة بالكامل تشعرك أنك تستخدمين علامة عالمية. أنصح بالكريم الليلي بشدة.",
  },
  {
    name: "لينا يوسف",
    city: "HOMS",
    text: "أخيراً منتجات عربية بجودة عالمية. سرعة التوصيل وخدمة العملاء كانتا ممتازتين.",
  },
];

export default function Testimonials() {
  return (
    <div className="grid md:grid-cols-3 gap-7 max-w-[1300px] mx-auto">
      {TESTIMONIALS.map((t) => (
        <div key={t.name} className="border border-line rounded p-9 bg-white/[0.02]">
          <div className="flex gap-0.5 text-gold mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="#D4AF37" />
            ))}
          </div>
          <p className="text-ivory-dim font-light leading-loose mb-6 text-[14.5px]">&ldquo;{t.text}&rdquo;</p>
          <div className="flex items-center gap-3.5">
            <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-gold-dim to-charcoal-2 border border-line" />
            <div>
              <b className="block text-sm">{t.name}</b>
              <span className="text-xs text-gold-dim font-en tracking-wide">{t.city}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
