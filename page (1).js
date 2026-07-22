import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 md:px-14 pt-20 pb-8 bg-charcoal border-t border-line">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 max-w-[1400px] mx-auto mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className="font-en text-2xl tracking-[5px] mb-4">
            LUM<span className="text-gold">O</span>RA
          </div>
          <p className="text-ivory-dim text-[13.5px] leading-relaxed font-light max-w-[280px]">
            علامة فاخرة متخصصة بمنتجات العناية بالبشرة، نجمع بين النقاء والفخامة في كل قطرة.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="https://www.instagram.com/lumora.26"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-line rounded-full flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://wa.me/9630940035809"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-line rounded-full flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-gold-light text-sm tracking-wide mb-5">تسوقي</h4>
          <ul className="space-y-3 text-[13.5px] text-ivory-dim">
            <li><Link href="/products" className="hover:text-gold">جميع المنتجات</Link></li>
            <li><Link href="/products?filter=bestsellers" className="hover:text-gold">الأكثر مبيعاً</Link></li>
            <li><Link href="/products?filter=new" className="hover:text-gold">وصل حديثاً</Link></li>
            <li><Link href="/products?filter=sale" className="hover:text-gold">العروض</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold-light text-sm tracking-wide mb-5">الشركة</h4>
          <ul className="space-y-3 text-[13.5px] text-ivory-dim">
            <li><Link href="/about" className="hover:text-gold">من نحن</Link></li>
            <li><Link href="/contact" className="hover:text-gold">تواصل معنا</Link></li>
            <li><Link href="/faq" className="hover:text-gold">الأسئلة الشائعة</Link></li>
            <li><Link href="/track-order" className="hover:text-gold">تتبع الطلب</Link></li>
            <li><Link href="/privacy" className="hover:text-gold">سياسة الخصوصية</Link></li>
            <li><Link href="/terms" className="hover:text-gold">الشروط والأحكام</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold-light text-sm tracking-wide mb-5">تواصل معنا</h4>
          <p className="text-ivory-dim text-[13.5px] mb-2.5">
            واتساب: <span className="font-en">0940035809</span>
          </p>
          <p className="text-ivory-dim text-[13.5px]">instagram.com/lumora.26</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto pt-6 border-t border-line flex flex-col sm:flex-row justify-between gap-2 text-[12.5px] text-ivory-dim font-en">
        <span>© {new Date().getFullYear()} LUMORA — All Rights Reserved</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
