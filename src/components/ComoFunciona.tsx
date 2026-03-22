import { useState } from "react";
import { UserCheck, MapPin, Shield, FileText, Power, DollarSign } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const APP_URL = "https://app.orientego.com";

const KEYS = [
  "paso_pasajero_1", "paso_pasajero_2", "paso_pasajero_3",
  "paso_conductor_1", "paso_conductor_2", "paso_conductor_3",
];

const passengerMeta = [
  { icon: UserCheck, step: "01", title: "Regístrate en la Web",       key: "paso_pasajero_1" },
  { icon: MapPin,    step: "02", title: "Solicita tu viaje",           key: "paso_pasajero_2" },
  { icon: Shield,    step: "03", title: "Viaja seguro",               key: "paso_pasajero_3" },
];

const driverMeta = [
  { icon: FileText,   step: "01", title: "Regístrate y sube documentos", key: "paso_conductor_1" },
  { icon: Power,      step: "02", title: "Actívate cuando quieras",       key: "paso_conductor_2" },
  { icon: DollarSign, step: "03", title: "Gana con tu vehículo",          key: "paso_conductor_3" },
];

export default function ComoFunciona() {
  const [tab, setTab] = useState<"pasajero" | "conductor">("pasajero");
  const { settings, loading } = useSiteSettings(KEYS);

  const steps = tab === "pasajero" ? passengerMeta : driverMeta;
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
                    ? "bg-brand-navy text-white shadow-md"
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
          {steps.map(({ icon: Icon, step, title, key }, i) => (
            <div key={step} className="relative flex flex-col items-center text-center p-6">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-0 h-px border-t-2 border-dashed border-brand-navy/20 z-0" />
              )}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center mb-4">
                <Icon size={28} className="text-brand-teal" strokeWidth={1.7} />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-teal rounded-full text-xs font-bold text-white flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{title}</h3>
              {loading ? (
                <div className="h-12 w-full bg-muted rounded-lg animate-pulse" />
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">{settings[key]}</p>
              )}
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
