import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products?.length) {
    return (
      <p className="text-center text-ivory-dim py-16">لا توجد منتجات لعرضها حالياً.</p>
    );
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 max-w-[1400px] mx-auto">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
