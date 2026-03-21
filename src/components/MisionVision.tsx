import { Target, Eye, CheckCircle } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Nuestra Misión",
    color: "brand-blue",
    text: "Facilitar la movilidad en Sucre mediante tecnología accesible, impulsando la economía local y conectando comunidades.",
  },
  {
    icon: Eye,
    title: "Nuestra Visión",
    color: "brand-teal",
    text: "Ser el estándar de transporte digital en las regiones que otros olvidan, devolviendo la tranquilidad y seguridad a cada traslado.",
  },
];

const reasons = [
  "Conductores verificados con documentos actualizados.",
  "Precios justos y transparentes, sin sorpresas.",
  "Funciona desde cualquier celular con internet.",
  "No consume la memoria de tu teléfono.",
];

export default function MisionVision() {
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
          {cards.map(({ icon: Icon, title, color, text }) => (
            <div key={title} className="card-feature group">
              <div className={`icon-wrapper bg-${color}/10 text-${color} mb-5`}>
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Why us */}
        <div className="max-w-3xl mx-auto bg-soft-blue rounded-2xl p-8">
          <p className="text-center text-foreground/80 text-base md:text-lg leading-relaxed mb-6">
            Solucionamos la incertidumbre del transporte local verificado, ofreciendo
            <strong className="text-brand-blue"> precios justos y conductores evaluados</strong>, todo
            desde una interfaz web simple que no consume la memoria de tu teléfono.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm text-foreground/75">
                <CheckCircle size={18} className="text-brand-teal shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
