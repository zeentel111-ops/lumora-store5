export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/account", "/checkout"],
    },
    sitemap: "https://lumora-store.example.com/sitemap.xml",
  };
}
