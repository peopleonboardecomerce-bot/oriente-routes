import heroBg from "@/assets/hero-bg.jpg";

const APP_URL = "https://app.orientego.com";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <img
        src={heroBg}
        alt="Oriente Venezolano"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-20">
        <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Sucre · Yaguaraparo · Oriente
        </span>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-md">
          Tu viaje seguro y confiable<br className="hidden sm:block" />
          <span className="text-brand-teal"> en el Oriente Venezolano.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
          Conectamos pasajeros y conductores a través de nuestra plataforma web.
          Sin descargas pesadas, directo desde tu navegador.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-hero"
          >
            Usar la Aplicación Web →
          </a>
          <button
            onClick={() => {
              document.querySelector("#como-funciona")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-ghost-hero"
          >
            ¿Cómo funciona?
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-16 md:mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { val: "100%", label: "Web, sin app" },
            { val: "Gratis", label: "Registro" },
            { val: "24/7", label: "Disponible" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-brand-teal">{s.val}</span>
              <span className="text-white/70 text-xs sm:text-sm mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
