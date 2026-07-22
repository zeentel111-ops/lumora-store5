@tailwind base;
@tailwind components;
@tailwind utilities;

::selection {
  background: #d4af37;
  color: #0b0b0b;
}

html {
  scroll-behavior: smooth;
}

@layer components {
  .eyebrow {
    @apply font-en text-[12px] tracking-[4px] text-gold uppercase flex items-center gap-2.5;
  }
  .btn-primary {
    @apply inline-flex items-center gap-2.5 bg-gradient-to-br from-gold-light via-gold to-gold-dim text-black px-9 py-4 font-semibold text-sm rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_-10px_rgba(212,175,55,0.55)];
  }
  .btn-ghost {
    @apply inline-flex items-center gap-2.5 text-ivory text-sm font-medium border-b border-line pb-1 transition-colors hover:border-gold hover:text-gold-light;
  }
  .card {
    @apply bg-gradient-to-b from-white/[0.035] to-white/[0.01] border border-line rounded overflow-hidden relative transition-all duration-500 hover:-translate-y-2 hover:border-gold/60 hover:shadow-[0_30px_50px_-22px_rgba(0,0,0,0.7)];
  }
  .section-pad {
    @apply px-6 md:px-14 py-24 md:py-32;
  }
}
