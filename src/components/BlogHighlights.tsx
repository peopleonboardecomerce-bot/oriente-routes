import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const categoryColors: Record<string, string> = {
  Tecnología: "bg-brand-blue/10 text-brand-blue",
  Comunidad: "bg-brand-teal/10 text-brand-teal",
  Seguridad: "bg-brand-yellow/20 text-amber-700",
};

export default function BlogHighlights() {
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

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-card group"
            >
              <div className="overflow-hidden rounded-t-2xl aspect-[16/9]">
                <img
                  src={post.thumbnail}
                  alt={post.heroAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <h3 className="font-display text-base font-semibold text-foreground mt-3 mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.snippet}</p>
                <div className="flex items-center gap-1.5 mt-4 text-brand-blue text-sm font-medium">
                  Leer artículo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
