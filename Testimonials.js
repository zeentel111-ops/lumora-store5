export function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3.5 w-fit mx-auto">
      <span className="w-[60px] h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      <svg width="12" height="16" viewBox="0 0 12 16" className="drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]">
        <path d="M6 0C6 0 12 8 12 11.5C12 14.5 9.3 16 6 16C2.7 16 0 14.5 0 11.5C0 8 6 0 6 0Z" fill="#D4AF37" />
      </svg>
      <span className="w-[60px] h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
    </div>
  );
}

export function SectionHead({ eyebrow, title, desc }) {
  return (
    <div className="text-center max-w-[640px] mx-auto mb-16">
      <div className="eyebrow justify-center mb-3.5">{eyebrow}</div>
      <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
      {desc && <p className="text-ivory-dim font-light leading-relaxed mb-5">{desc}</p>}
      <GoldDivider />
    </div>
  );
}
