const VALUES = ["عناية طبيعية", "مكونات نقية 100%", "خالٍ من القسوة", "شحن لجميع المناطق", "ضمان الجودة"];

export default function Marquee() {
  const track = [...VALUES, ...VALUES];
  return (
    <div className="border-y border-line py-5 overflow-hidden bg-charcoal">
      <div className="flex gap-16 whitespace-nowrap w-max animate-[scrollx_26s_linear_infinite]">
        {track.map((v, i) => (
          <span key={i} className="font-en text-sm tracking-[3px] text-gold-dim uppercase">
            {v} ✦
          </span>
        ))}
      </div>
      <style jsx global>{`
        @keyframes scrollx {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
