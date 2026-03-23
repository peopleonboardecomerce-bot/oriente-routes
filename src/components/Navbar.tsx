import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Inicio",        anchor: "inicio" },
  { label: "Misión",        anchor: "mision" },
  { label: "Cómo Funciona", anchor: "como-funciona" },
  { label: "Blog",          anchor: "blog" },
];

const APP_URL = "https://app.enlasalida.com";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (anchor: string) => {
    setOpen(false);
    if (isHome) {
      const el = document.querySelector(`#${anchor}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate home, then scroll once the page is rendered
      navigate(`/#${anchor}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-nav shadow-nav backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); handleNav("inicio"); }}
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-navy text-white">
            <Zap size={16} strokeWidth={2.5} />
          </span>
          <span className={scrolled ? "text-foreground" : "text-white"}>
            Oriente<span className="text-brand-teal">Go</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.anchor}
              onClick={() => handleNav(l.anchor)}
              className={`text-sm font-medium transition-colors hover:text-brand-teal ${
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
        <div className="md:hidden bg-card border-t border-border shadow-lg px-4 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l.anchor}
              onClick={() => handleNav(l.anchor)}
              className="text-left text-base font-medium text-foreground hover:text-brand-teal transition-colors py-1"
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

