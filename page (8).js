"use client";

import { useEffect, useState } from "react";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "@/lib/products";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { categories } from "@/data/mock-products";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import toast from "react-hot-toast";

const EMPTY_FORM = {
  name: "", brand: "", description: "", price: "", oldPrice: "", category: categories[0],
  skinType: "", stock: "", isNew: false, bestSeller: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { refresh(); }, []);

  async function refresh() {
    setLoading(true);
    setProducts(await getAllProducts());
    setLoading(false);
  }

  function openNew() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setImageFile(null);
    setShowForm(true);
  }

  function openEdit(p) {
    setForm({
      name: p.name, brand: p.brand, description: p.description, price: p.price, oldPrice: p.oldPrice || "",
      category: p.category, skinType: p.skinType, stock: p.stock, isNew: p.isNew, bestSeller: p.bestSeller,
    });
    setEditingId(p.id);
    setImageFile(null);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = null;
      if (imageFile) {
        const imgRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
        await uploadBytes(imgRef, imageFile);
        imageUrl = await getDownloadURL(imgRef);
      }
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
        stock: parseInt(form.stock) || 0,
        ...(imageUrl ? { images: [imageUrl] } : {}),
      };
      if (editingId) {
        await updateProduct(editingId, payload);
        toast.success("تم تحديث المنتج");
      } else {
        await addProduct(payload);
        toast.success("تمت إضافة المنتج");
      }
      setShowForm(false);
      refresh();
    } catch (err) {
      toast.error("تعذر حفظ المنتج، تحققي من إعدادات Firebase");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("هل تريدين حذف هذا المنتج؟")) return;
    await deleteProduct(id);
    toast.success("تم حذف المنتج");
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">المنتجات</h1>
        <button onClick={openNew} className="btn-primary">
          <Plus size={16} /> إضافة منتج
        </button>
      </div>

      {loading ? (
        <p className="text-ivory-dim">جارِ التحميل...</p>
      ) : (
        <div className="border border-line rounded overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-charcoal text-ivory-dim">
              <tr>
                <th className="text-right p-4">المنتج</th>
                <th className="text-right p-4">الفئة</th>
                <th className="text-right p-4">السعر</th>
                <th className="text-right p-4">المخزون</th>
                <th className="text-right p-4">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="p-4">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gold-dim font-en">{p.brand}</div>
                  </td>
                  <td className="p-4 text-ivory-dim">{p.category}</td>
                  <td className="p-4 font-en text-gold-light">${p.price?.toFixed(2)}</td>
                  <td className="p-4 text-ivory-dim">{p.stock}</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button onClick={() => openEdit(p)} className="text-gold hover:opacity-80"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(p.id)} className="text-ivory-dim hover:text-red-400"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-6">
          <div className="bg-charcoal border border-line rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">{editingId ? "تعديل المنتج" : "منتج جديد"}</h3>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="اسم المنتج" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-black border border-line rounded px-4 py-2.5 text-sm outline-none" />
              <input required placeholder="الماركة" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full bg-black border border-line rounded px-4 py-2.5 text-sm outline-none" />
              <textarea required placeholder="الوصف" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-black border border-line rounded px-4 py-2.5 text-sm outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="number" step="0.01" placeholder="السعر" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="bg-black border border-line rounded px-4 py-2.5 text-sm outline-none" />
                <input type="number" step="0.01" placeholder="السعر قبل الخصم" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                  className="bg-black border border-line rounded px-4 py-2.5 text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="bg-black border border-line rounded px-4 py-2.5 text-sm outline-none">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
                <input required type="number" placeholder="الكمية بالمخزون" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="bg-black border border-line rounded px-4 py-2.5 text-sm outline-none" />
              </div>
              <input placeholder="نوع البشرة المناسب" value={form.skinType} onChange={(e) => setForm({ ...form, skinType: e.target.value })}
                className="w-full bg-black border border-line rounded px-4 py-2.5 text-sm outline-none" />

              <label className="flex items-center gap-2 text-sm text-ivory-dim border border-line rounded px-4 py-2.5 cursor-pointer">
                <Upload size={15} />
                {imageFile ? imageFile.name : "رفع صورة المنتج"}
                <input type="file" accept="image/*" hidden onChange={(e) => setImageFile(e.target.files[0])} />
              </label>

              <div className="flex gap-6 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} /> منتج جديد</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.bestSeller} onChange={(e) => setForm({ ...form, bestSeller: e.target.checked })} /> الأكثر مبيعاً</label>
              </div>

              <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
                {saving ? "جارِ الحفظ..." : "حفظ المنتج"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
