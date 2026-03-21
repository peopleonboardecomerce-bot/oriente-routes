import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, Zap } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const APP_URL = "https://app.orientego.com";

const categoryColors: Record<string, string> = {
  Tecnología: "bg-brand-blue/10 text-brand-blue",
  Comunidad: "bg-brand-teal/10 text-brand-teal",
  Seguridad: "bg-brand-yellow/20 text-amber-700",
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug ?? "");
  const related = getRelatedPosts(slug ?? "");

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="font-display text-4xl font-bold text-foreground">Artículo no encontrado</h1>
        <p className="text-muted-foreground">El artículo que buscas no existe o fue movido.</p>
        <Link
          to="/"
          className="btn-cta-secondary mt-2"
        >
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative w-full h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden mt-16">
        <img
          src={post.heroImage}
          alt={post.heroAlt}
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
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${categoryColors[post.category] ?? "bg-secondary text-foreground"}`}
          >
            {post.category}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-brand-blue" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-brand-blue" />
              <span>{post.readTime} de lectura</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center">
                <Zap size={11} className="text-white" />
              </span>
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        {/* Article body — prose typography */}
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
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA Banner */}
        <div className="mt-14 rounded-2xl bg-brand-blue p-8 text-white text-center">
          <p className="text-white/70 text-sm mb-1">¿Listo para el siguiente paso?</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Empieza a usar nuestra Web App ahora.
          </h3>
          <p className="text-white/75 text-sm max-w-md mx-auto mb-6">
            Sin descargas. Sin complicaciones. Regístrate gratis en segundos y viaja con seguridad por el oriente venezolano.
          </p>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
          >
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
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="blog-card group"
                >
                  <div className="overflow-hidden rounded-t-2xl aspect-[16/9]">
                    <img
                      src={rp.thumbnail}
                      alt={rp.heroAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[rp.category] ?? "bg-secondary text-foreground"}`}
                    >
                      {rp.category}
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
