import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_url: string | null;
  published_at: string | null;
  author: string | null;
}

const categoryColors: Record<string, string> = {
  Tecnología: "bg-brand-teal/10 text-brand-teal",
  Comunidad:  "bg-brand-brown/10 text-brand-brown",
  Seguridad:  "bg-brand-green/10 text-brand-green",
  General:    "bg-muted text-muted-foreground",
};

const PLACEHOLDER = "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80";

export default function BlogHighlights() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("posts")
      .select("id, slug, title, excerpt, category, cover_url, published_at, author")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="section-label">Nuestro blog</span>
          <h2 className="section-title">Novedades y Guías.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-3 text-sm md:text-base">
            Mantente informado sobre transporte, tecnología y comunidad en el oriente venezolano.
          </p>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="blog-card overflow-hidden animate-pulse">
                <div className="aspect-[16/9] bg-muted rounded-t-2xl" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-20 bg-muted rounded-full" />
                  <div className="h-5 bg-muted rounded w-4/5" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No posts */}
        {!loading && posts.length === 0 && (
          <p className="text-center text-muted-foreground text-sm">
            No hay artículos publicados aún.
          </p>
        )}

        {/* Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card group">
                <div className="overflow-hidden rounded-t-2xl aspect-[16/9]">
                  <img
                    src={post.cover_url ?? PLACEHOLDER}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category ?? "General"] ?? "bg-muted text-muted-foreground"}`}
                  >
                    {post.category ?? "General"}
                  </span>
                  <h3 className="font-display text-base font-semibold text-foreground mt-3 mb-2 leading-snug group-hover:text-brand-teal transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 text-brand-teal text-sm font-medium">
                    Leer artículo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
