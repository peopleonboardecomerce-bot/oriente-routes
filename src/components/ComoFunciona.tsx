import { useState } from "react";
import { UserCheck, MapPin, Shield, FileText, Power, DollarSign } from "lucide-react";

const APP_URL = "https://app.orientego.com";

const passengerSteps = [
  {
    icon: UserCheck,
    step: "01",
    title: "Regístrate en la Web",
    desc: "Crea tu cuenta en segundos. Solo necesitas tu nombre, teléfono y una contraseña.",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Solicita tu viaje",
    desc: "Indica tu origen y destino. Recibirás conductores disponibles cerca de ti.",
  },
  {
    icon: Shield,
    step: "03",
    title: "Viaja seguro",
    desc: "Tu conductor está verificado y evaluado. Viaja con total tranquilidad.",
  },
];

const driverSteps = [
  {
    icon: FileText,
    step: "01",
    title: "Regístrate y sube documentos",
    desc: "Crea tu perfil de conductor y sube tus documentos para verificación.",
  },
  {
    icon: Power,
    step: "02",
    title: "Actívate cuando quieras",
    desc: "Tú decides cuándo trabajar. Activa o desactiva tu disponibilidad libremente.",
  },
  {
    icon: DollarSign,
    step: "03",
    title: "Gana con tu vehículo",
    desc: "Genera ingresos con lo que ya tienes. Pagos claros y transparentes.",
  },
];

export default function ComoFunciona() {
  const [tab, setTab] = useState<"pasajero" | "conductor">("pasajero");
  const steps = tab === "pasajero" ? passengerSteps : driverSteps;
  const ctaText = tab === "pasajero" ? "Registrarme como Pasajero" : "Registrarme como Conductor";

  return (
    <section id="como-funciona" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="section-label">Simple y rápido</span>
          <h2 className="section-title">Empieza a moverte hoy.</h2>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10 md:mb-12">
          <div className="inline-flex bg-muted rounded-xl p-1 gap-1">
            {(["pasajero", "conductor"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                  tab === t
                    ? "bg-brand-blue text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "pasajero" ? "🧳 Pasajeros" : "🚗 Conductores"}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {steps.map(({ icon: Icon, step, title, desc }, i) => (
            <div key={step} className="relative flex flex-col items-center text-center p-6">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-0 h-px border-t-2 border-dashed border-brand-blue/20 z-0" />
              )}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-4">
                <Icon size={28} className="text-brand-blue" strokeWidth={1.7} />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-yellow rounded-full text-xs font-bold text-foreground flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-cta-secondary ${tab === "conductor" ? "btn-cta-conductor" : ""}`}
          >
            {ctaText} →
          </a>
        </div>
      </div>
    </section>
  );
}
