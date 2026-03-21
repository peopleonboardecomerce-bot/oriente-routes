import { ArrowRight } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const BLOG_URL = "https://blog.orientego.com"; // placeholder

const posts = [
  {
    img: blog1,
    alt: "Usando una aplicación web de transporte en celular",
    title: "5 razones para usar nuestra Aplicación Web en lugar de una App Nativa.",
    snippet:
      "Descubre por qué acceder desde el navegador es más eficiente, liviano y accesible para todos los usuarios del oriente venezolano.",
    href: `${BLOG_URL}/razones-app-web`,
    category: "Tecnología",
  },
  {
    img: blog2,
    alt: "Mercado local de Yaguaraparo",
    title: "Impacto de la movilidad digital en el comercio de Yaguaraparo.",
    snippet:
      "Cómo la conectividad de transporte transforma el acceso al mercado local y genera oportunidades para comerciantes y emprendedores.",
    href: `${BLOG_URL}/movilidad-digital-yaguaraparo`,
    category: "Comunidad",
  },
  {
    img: blog3,
    alt: "Conductor verificado con documentos oficiales",
    title: "Conoce nuestro estricto proceso de verificación de conductores.",
    snippet:
      "La seguridad es nuestra prioridad. Te explicamos paso a paso cómo evaluamos y verificamos a cada conductor en nuestra plataforma.",
    href: `${BLOG_URL}/verificacion-conductores`,
    category: "Seguridad",
  },
];

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
          {posts.map((post) => (
            <a
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card group"
            >
              <div className="overflow-hidden rounded-t-2xl aspect-[16/9]">
                <img
                  src={post.img}
                  alt={post.alt}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
