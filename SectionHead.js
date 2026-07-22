"use client";

import { useEffect, useState } from "react";

export default function Countdown({ hours = 12, minutes = 45, seconds = 30 }) {
  const [total, setTotal] = useState(hours * 3600 + minutes * 60 + seconds);

  useEffect(() => {
    const id = setInterval(() => {
      setTotal((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");

  return (
    <div className="flex gap-3.5 font-en">
      {[
        { v: h, l: "HOURS" },
        { v: m, l: "MIN" },
        { v: s, l: "SEC" },
      ].map((box) => (
        <div key={box.l} className="w-[70px] text-center border border-line rounded py-3 bg-black/30">
          <b className="block text-2xl text-gold-light">{box.v}</b>
          <span className="text-[10px] text-ivory-dim tracking-wide">{box.l}</span>
        </div>
      ))}
    </div>
  );
}
