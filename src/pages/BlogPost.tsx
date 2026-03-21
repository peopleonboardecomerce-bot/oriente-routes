import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const APP_URL = "https://app.orientego.com";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  cover_url: string | null;
  published_at: string | null;
  author: string | null;
}

const categoryColors: Record<string, string> = {
  Tecnología: "bg-brand-blue/10 text-brand-blue",
  Comunidad: "bg-brand-teal/10 text-brand-teal",
  Seguridad: "bg-brand-yellow/20 text-amber-700",
  General: "bg-muted text-muted-foreground",
};

const PLACEHOLDER = "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=1200&q=80";

function estimateReadTime(content: string | null): string {
  if (!content) return "1 min";
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-VE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null | undefined>(undefined); // undefined = loading
  const [related, setRelated] = useState<Post[]>([]);

  useEffect(() => {
    if (!slug) { setPost(null); return; }
    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single()
      .then(({ data }) => {
        setPost(data ?? null);
        if (data) {
          // Fetch 2 related posts from same category (excluding current)
          supabase
            .from("posts")
            .select("id, slug, title, excerpt, category, cover_url, published_at, author, content")
            .eq("status", "published")
            .neq("slug", slug)
            .limit(2)
            .then(({ data: rel }) => setRelated(rel ?? []));
        }
      });
  }, [slug]);

  // Loading state
  if (post === undefined) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mt-16 animate-pulse">
          <div className="w-full h-[45vh] bg-muted" />
          <div className="container mx-auto px-4 max-w-3xl mt-8 space-y-4">
            <div className="h-6 w-24 bg-muted rounded-full" />
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="h-10 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-full mt-8" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="font-display text-4xl font-bold text-foreground">Artículo no encontrado</h1>
        <p className="text-muted-foreground">El artículo que buscas no existe o fue movido.</p>
        <Link to="/" className="btn-cta-secondary mt-2">← Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative w-full h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden mt-16">
        <img
          src={post.cover_url ?? PLACEHOLDER}
          alt={post.title}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Article container */}
      <div className="container mx-auto px-4 max-w-3xl -mt-16 relative z-10">

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand-blue transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Volver al inicio
        </button>

        {/* Post header */}
        <header className="mb-8">
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${categoryColors[post.category ?? "General"] ?? "bg-muted text-muted-foreground"}`}
          >
            {post.category ?? "General"}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
            {post.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-blue" />
                <span>{formatDate(post.published_at)}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-brand-blue" />
              <span>{estimateReadTime(post.content)} de lectura</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center">
                <Zap size={11} className="text-white" />
              </span>
              <span>{post.author ?? "Equipo OrienteGo"}</span>
            </div>
          </div>
        </header>

        {/* Article body */}
        <article
          className="prose prose-slate prose-lg max-w-none
            prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:text-foreground/80
            prose-li:marker:text-brand-blue
            prose-blockquote:border-l-[hsl(var(--brand-blue))] prose-blockquote:bg-[hsl(var(--soft-blue))]
            prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:pr-4
            prose-blockquote:not-italic prose-blockquote:text-foreground/70"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* CTA Banner */}
        <div className="mt-14 rounded-2xl bg-brand-blue p-8 text-white text-center">
          <p className="text-white/70 text-sm mb-1">¿Listo para el siguiente paso?</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Empieza a usar nuestra Web App ahora.
          </h3>
          <p className="text-white/75 text-sm max-w-md mx-auto mb-6">
            Sin descargas. Sin complicaciones. Regístrate gratis en segundos y viaja con seguridad.
          </p>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
            Registrarme gratis →
          </a>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16 mb-16">
            <h2 className="font-display text-xl font-bold text-foreground mb-6">
              Artículos relacionados
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((rp) => (
                <Link key={rp.slug} to={`/blog/${rp.slug}`} className="blog-card group">
                  <div className="overflow-hidden rounded-t-2xl aspect-[16/9]">
                    <img
                      src={rp.cover_url ?? PLACEHOLDER}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[rp.category ?? "General"] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {rp.category ?? "General"}
                    </span>
                    <h3 className="font-display text-sm font-semibold text-foreground mt-2 mb-1 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                      {rp.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-brand-blue text-xs font-medium">
                      Leer artículo <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
