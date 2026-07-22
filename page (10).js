import { getAllProducts } from "@/lib/products";

const BASE_URL = "https://lumora-store.example.com";

export default async function sitemap() {
  const products = await getAllProducts();

  const staticRoutes = ["", "/products", "/about", "/contact", "/faq", "/privacy", "/terms", "/track-order"].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
    })
  );

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
