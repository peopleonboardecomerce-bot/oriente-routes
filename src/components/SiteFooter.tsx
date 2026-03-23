import { Zap, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const APP_URL = "https://app.enlasalida.com";

const navLinks = [
  { label: "Misión y Visión", href: "#mision" },
  { label: "Cómo Funciona", href: "#como-funciona" },
  { label: "Blog", href: "#blog" },
];

const handleNav = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const FOOTER_KEYS = [
  "footer_about_text",
  "footer_contact_email",
  "footer_phone",
  "footer_facebook",
  "footer_instagram",
  "footer_twitter",
];

export default function SiteFooter() {
  const { settings } = useSiteSettings(FOOTER_KEYS);

  const aboutText =
    settings.footer_about_text ||
    "La plataforma de transporte web para Venezuela. Sin descargas, sin complicaciones.";
  const contactEmail = settings.footer_contact_email || "hola@enlasalida.com";
  const phone = settings.footer_phone || "+58 000-000-0000";
  const fbUrl = settings.footer_facebook || "#";
  const igUrl = settings.footer_instagram || "#";
  const twUrl = settings.footer_twitter || "#";

  const socials = [
    { icon: Facebook, label: "Facebook", href: fbUrl },
    { icon: Instagram, label: "Instagram", href: igUrl },
    { icon: Twitter, label: "Twitter/X", href: twUrl },
  ];

  return (
    <footer className="bg-footer-dark text-white">
      {/* CTA band */}
      <div style={{ backgroundColor: "hsl(var(--brand-navy))" }} className="py-10">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/70 text-sm">¿Listo para tu próximo viaje?</p>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              Accede a la plataforma ahora.
            </h3>
          </div>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta shrink-0"
          >
            Entrar a la App →
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg text-white"
              style={{ backgroundColor: "hsl(var(--brand-teal))" }}
            >
              <Zap size={16} strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-bold">
              EnLa<span style={{ color: "hsl(var(--brand-teal))" }}>Salida</span>
            </span>
          </div>
          <p className="text-white/55 text-sm leading-relaxed max-w-xs">{aboutText}</p>
          <div className="flex gap-3 mt-5">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/10 transition-colors flex items-center justify-center"
                style={{ transition: "background-color 0.2s" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "hsl(var(--brand-teal))")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "rgba(255,255,255,0.10)")
                }
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-wider">
            Navegación
          </h4>
          <ul className="space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className="text-white/55 text-sm transition-colors hover:text-white"
                  style={{ transition: "color 0.2s" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color =
                      "hsl(var(--brand-teal))")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)")
                  }
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-wider">
            Contacto
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-sm text-white/55">
              <MapPin
                size={15}
                className="shrink-0 mt-0.5"
                style={{ color: "hsl(var(--brand-teal))" }}
              />
              Venezuela
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/55">
              <Mail size={15} className="shrink-0" style={{ color: "hsl(var(--brand-teal))" }} />
              {contactEmail}
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/55">
              <Phone size={15} className="shrink-0" style={{ color: "hsl(var(--brand-teal))" }} />
              {phone}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/35 text-xs">
          <span>© {new Date().getFullYear()} EnLaSalida. Todos los derechos reservados.</span>
          <span>Hecho con ❤️ para Venezuela.</span>
        </div>
      </div>
    </footer>
  );
}
