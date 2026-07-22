import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductGrid from "@/components/ProductGrid";
import { SectionHead } from "@/components/SectionHead";
import Countdown from "@/components/Countdown";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getAllProducts();
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <>
      <Hero />
      <Marquee />

      <section id="new" className="section-pad">
        <SectionHead eyebrow="New Arrivals" title="أحدث المنتجات" />
        <ProductGrid products={newArrivals.length ? newArrivals : products.slice(0, 4)} />
      </section>

      <section id="about" className="section-pad">
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-14 max-w-[1300px] mx-auto items-center">
          <div className="relative h-[380px] md:h-[460px] rounded border border-line bg-charcoal flex items-center justify-center"
            style={{ background: "radial-gradient(circle at 30% 20%, rgba(212,175,55,0.14), transparent 60%), #161514" }}
          >
            <div className="w-[220px] h-[220px] rounded-full border border-gold-dim flex items-center justify-center relative">
              <span className="absolute -inset-[30px] border border-line rounded-full" />
              <svg width="60" height="76" viewBox="0 0 12 16">
                <path d="M6 0C6 0 12 8 12 11.5C12 14.5 9.3 16 6 16C2.7 16 0 14.5 0 11.5C0 8 6 0 6 0Z" fill="#D4AF37" />
              </svg>
            </div>
          </div>
          <div>
            <div className="eyebrow mb-4">Our Philosophy</div>
            <h2 className="text-[30px] md:text-[44px] font-bold mb-6 leading-[1.3]">
              Lumora... حيث يلتقي العلم بالفخامة
            </h2>
            <p className="text-ivory-dim text-[15.5px] leading-loose font-light mb-6">
              وُلدت Lumora من إيمان بسيط: أن العناية الحقيقية بالبشرة هي طقس، لا مجرد روتين. نصمم كل منتج بعناية
              فائقة، بمكونات مختارة بدقة ونتائج ملموسة، لنمنح بشرتك تجربة تستحقها كل يوم.
            </p>
            <p className="text-ivory-dim text-[15.5px] leading-loose font-light mb-9">
              من أول قطرة سيروم إلى آخر لمسة كريم ليلي، نحرص على أن يعكس كل تفصيل هويتنا: نقاء، فخامة، وثقة.
            </p>
            <div className="flex gap-11">
              <div>
                <b className="block font-en text-3xl text-gold font-semibold">40K+</b>
                <span className="text-xs text-ivory-dim">عميلة راضية</span>
              </div>
              <div>
                <b className="block font-en text-3xl text-gold font-semibold">98%</b>
                <span className="text-xs text-ivory-dim">نتائج مثبتة</span>
              </div>
              <div>
                <b className="block font-en text-3xl text-gold font-semibold">4.9</b>
                <span className="text-xs text-ivory-dim">تقييم العملاء</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-charcoal border-y border-line">
        <SectionHead eyebrow="Best Sellers" title="الأكثر مبيعاً" />
        <ProductGrid products={bestSellers.length ? bestSellers : products.slice(0, 4)} />
      </section>

      <section id="offers" className="section-pad">
        <div className="max-w-[1300px] mx-auto border border-line rounded-md p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden bg-charcoal"
          style={{ backgroundImage: "linear-gradient(120deg, rgba(212,175,55,0.09), rgba(212,175,55,0) 60%)" }}
        >
          <div className="text-center md:text-right">
            <div className="eyebrow justify-center md:justify-start mb-3.5">Limited Time</div>
            <h3 className="text-2xl md:text-[38px] font-bold mb-3.5">خصم 20% على جميع منتجات العناية بالبشرة</h3>
            <p className="text-ivory-dim font-light mb-6">
              استخدمي الكود <b className="font-en text-gold-light">LUMORA15</b> عند إتمام الطلب — العرض ينتهي قريباً
            </p>
            <Countdown />
          </div>
          <Link href="/products?filter=sale" className="btn-primary shrink-0">
            تسوقي العرض
            <ArrowLeft size={14} />
          </Link>
        </div>
      </section>

      <section className="section-pad bg-charcoal">
        <SectionHead eyebrow="Testimonials" title="آراء عميلاتنا" />
        <Testimonials />
      </section>

      <Newsletter />
    </>
  );
}
