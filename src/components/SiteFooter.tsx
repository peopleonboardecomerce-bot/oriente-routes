import { Zap, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const APP_URL = "https://app.orientego.com";

const navLinks = [
  { label: "Misión y Visión", href: "#mision" },
  { label: "Cómo Funciona", href: "#como-funciona" },
  { label: "Blog", href: "#blog" },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter/X", href: "#" },
];

const handleNav = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function SiteFooter() {
  return (
    <footer className="bg-footer-dark text-white">
      {/* CTA band */}
      <div className="bg-brand-navy py-10">
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
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-teal text-white">
              <Zap size={16} strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-bold">
              Oriente<span className="text-brand-teal">Go</span>
            </span>
          </div>
          <p className="text-white/55 text-sm leading-relaxed max-w-xs">
            La plataforma de transporte web para el oriente venezolano. Sin descargas, sin complicaciones.
          </p>
          <div className="flex gap-3 mt-5">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-teal transition-colors flex items-center justify-center"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-wider">Navegación</h4>
          <ul className="space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className="text-white/55 hover:text-brand-teal text-sm transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-wider">Contacto</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-sm text-white/55">
              <MapPin size={15} className="shrink-0 mt-0.5 text-brand-teal" />
              Yaguaraparo, Estado Sucre, Venezuela
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/55">
              <Mail size={15} className="shrink-0 text-brand-teal" />
              hola@orientego.com
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/55">
              <Phone size={15} className="shrink-0 text-brand-teal" />
              +58 000-000-0000
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/35 text-xs">
          <span>© {new Date().getFullYear()} OrienteGo. Todos los derechos reservados.</span>
          <span>Hecho con ❤️ para el oriente venezolano.</span>
        </div>
      </div>
    </footer>
  );
}
