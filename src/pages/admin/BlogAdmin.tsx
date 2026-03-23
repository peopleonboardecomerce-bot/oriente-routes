import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, X, Save, Upload,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  cover_url: string | null;
  author: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
}

const CATEGORIES = ["General", "Tecnología", "Comunidad", "Seguridad", "Movilidad"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "General",
  cover_url: "",
  author: "Equipo EnLaSalida",
  status: "draft" as "draft" | "published",
};

export default function AdminBlog() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setPosts(data as Post[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const openCreate = () => {
    setEditId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  };

  const openEdit = (post: Post) => {
    setEditId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      category: post.category ?? "General",
      cover_url: post.cover_url ?? "",
      author: post.author ?? "Equipo OrienteGo",
      status: post.status,
    });
    setShowForm(true);
  };

  const handleTitleChange = (val: string) => {
    setForm((f) => ({ ...f, title: val, slug: editId ? f.slug : slugify(val) }));
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `covers/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (error) {
      toast({ title: "Error al subir imagen", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(path);
    setForm((f) => ({ ...f, cover_url: urlData.publicUrl }));
    setUploading(false);
    toast({ title: "Imagen subida", description: "Imagen de portada guardada." });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast({ title: "Campos requeridos", description: "Título y slug son obligatorios.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      published_at: form.status === "published" ? new Date().toISOString() : null,
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("posts").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("posts").insert(payload));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Error al guardar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editId ? "Post actualizado" : "Post creado", description: "Los cambios se guardaron correctamente." });
    setShowForm(false);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    setDeleteId(null);
    if (error) {
      toast({ title: "Error al eliminar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Post eliminado", description: "El artículo fue eliminado." });
    fetchPosts();
  };

  const toggleStatus = async (post: Post) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    const { error } = await supabase.from("posts").update({
      status: newStatus,
      published_at: newStatus === "published" ? new Date().toISOString() : null,
    }).eq("id", post.id);
    if (!error) {
      toast({ title: `Post ${newStatus === "published" ? "publicado" : "movido a borrador"}` });
      fetchPosts();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Gestión de Blog</h1>
          <p className="text-sm text-muted-foreground mt-0.5">CRUD de artículos del blog</p>
        </div>
        <button onClick={openCreate} className="btn-cta-secondary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nuevo post
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground text-sm">
            No hay posts aún. ¡Crea el primero!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Título</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Categoría</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Autor</th>
                  <th className="text-left px-4 py-3">Estado</th>
                  <th className="text-left px-4 py-3 hidden lg:table-cell">Fecha</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground max-w-[220px] truncate">
                      {post.title}
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell text-muted-foreground">{post.category}</td>
                    <td className="px-4 py-3.5 hidden md:table-cell text-muted-foreground">{post.author}</td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => toggleStatus(post)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                          post.status === "published"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        }`}
                      >
                        {post.status === "published" ? (
                          <><Eye className="w-3 h-3" /> Publicado</>
                        ) : (
                          <><EyeOff className="w-3 h-3" /> Borrador</>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell text-muted-foreground whitespace-nowrap">
                      {new Date(post.created_at).toLocaleDateString("es-VE")}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEdit(post)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                          title="Editar"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                {editId ? "Editar post" : "Nuevo post"}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 text-muted-foreground hover:text-foreground transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Título *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Título del artículo"
                />
              </div>
              {/* Slug */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                />
              </div>
              {/* Excerpt */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Extracto</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Breve descripción del artículo…"
                />
              </div>
              {/* Content */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Contenido (HTML/Markdown)</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={8}
                  className="w-full px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y font-mono"
                  placeholder="<p>Contenido del artículo…</p>"
                />
              </div>
              {/* Row: Category + Author + Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Categoría</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Autor</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Estado</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "draft" | "published" }))}
                    className="w-full px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>
              {/* Cover image */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Imagen destacada</label>
                <label className="flex items-center gap-2 cursor-pointer w-fit">
                  <span className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-medium rounded-xl transition">
                    <Upload className="w-4 h-4" />
                    {uploading ? "Subiendo…" : "Subir imagen"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  />
                </label>
                {form.cover_url && (
                  <img src={form.cover_url} alt="cover" className="h-28 w-full object-cover rounded-xl" />
                )}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-cta-secondary flex items-center gap-2 disabled:opacity-60"
              >
                {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                <Save className="w-4 h-4" />
                {saving ? "Guardando…" : "Guardar post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-base font-semibold text-foreground">¿Eliminar este post?</h3>
            <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-xl text-muted-foreground transition">
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 text-sm bg-destructive text-white font-semibold rounded-xl hover:opacity-90 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
