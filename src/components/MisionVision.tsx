import { Target, Eye, CheckCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const KEYS = ["mision", "vision", "why_us"];

const cardMeta = [
  { icon: Target, title: "Nuestra Misión", key: "mision", color: "brand-navy" },
  { icon: Eye,    title: "Nuestra Visión", key: "vision", color: "brand-teal" },
];

const reasonsFallback = [
  "Conductores verificados con documentos actualizados.",
  "Precios justos y transparentes, sin sorpresas.",
  "Funciona desde cualquier celular con internet.",
  "No consume la memoria de tu teléfono.",
];

export default function MisionVision() {
  const { settings, loading } = useSiteSettings(KEYS);

  return (
    <section id="mision" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="section-label">Quiénes somos</span>
          <h2 className="section-title">Nuestra Misión y Visión.</h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
          {cardMeta.map(({ icon: Icon, title, key, color }) => (
            <div key={title} className="card-feature group">
              <div className={`icon-wrapper bg-${color}/10 text-${color} mb-5`}>
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{title}</h3>
              {loading ? (
                <div className="h-16 bg-muted rounded-lg animate-pulse" />
              ) : (
                <p className="text-muted-foreground leading-relaxed">{settings[key]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Why us */}
        <div className="max-w-3xl mx-auto bg-soft-bg rounded-2xl p-8">
          {loading ? (
            <div className="space-y-2">
              <div className="h-5 bg-muted/60 rounded animate-pulse w-full" />
              <div className="h-5 bg-muted/60 rounded animate-pulse w-4/5 mx-auto" />
            </div>
          ) : (
            <p className="text-center text-foreground/80 text-base md:text-lg leading-relaxed mb-6">
              {settings["why_us"]}
            </p>
          )}
          <ul className="grid sm:grid-cols-2 gap-3">
            {reasonsFallback.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm text-foreground/75">
                <CheckCircle size={18} className="text-brand-green shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
