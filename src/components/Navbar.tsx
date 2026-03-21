import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Misión", href: "#mision" },
  { label: "Cómo Funciona", href: "#como-funciona" },
  { label: "Blog", href: "#blog" },
];

const APP_URL = "https://app.orientego.com"; // placeholder

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-nav shadow-nav backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }}
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-blue text-white">
            <Zap size={16} strokeWidth={2.5} />
          </span>
          <span className={scrolled ? "text-foreground" : "text-white"}>
            Oriente<span className="text-brand-yellow">Go</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`text-sm font-medium transition-colors hover:text-brand-yellow ${
                scrolled ? "text-foreground/80" : "text-white/90"
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
          >
            Usar la App
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border shadow-lg px-4 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-left text-base font-medium text-foreground hover:text-brand-blue transition-colors py-1"
            >
              {l.label}
            </button>
          ))}
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta text-center mt-2"
          >
            Usar la App
          </a>
        </div>
      )}
    </header>
  );
}
