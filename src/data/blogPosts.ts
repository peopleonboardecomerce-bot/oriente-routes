import blog1Thumb from "@/assets/blog-1.jpg";
import blog2Thumb from "@/assets/blog-2.jpg";
import blog3Thumb from "@/assets/blog-3.jpg";
import post1Hero from "@/assets/blog-post-1-hero.jpg";
import post2Hero from "@/assets/blog-post-2-hero.jpg";
import post3Hero from "@/assets/blog-post-3-hero.jpg";

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  snippet: string;
  thumbnail: string;
  heroImage: string;
  heroAlt: string;
  date: string;
  readTime: string;
  author: string;
  content: string; // HTML string to be rendered with dangerouslySetInnerHTML
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "razones-app-web",
    category: "Tecnología",
    title: "5 razones para usar nuestra Aplicación Web en lugar de una App Nativa.",
    snippet:
      "Descubre por qué acceder desde el navegador es más eficiente, liviano y accesible para todos los usuarios del oriente venezolano.",
    thumbnail: blog1Thumb,
    heroImage: post1Hero,
    heroAlt: "Paisaje del oriente venezolano con casas coloridas y el golfo al fondo",
    date: "15 de enero, 2025",
    readTime: "5 min",
    author: "Equipo OrienteGo",
    content: `
      <p>En un mundo donde la tecnología avanza a pasos agigantados, la pregunta que todos se hacen es: <strong>¿necesito descargar otra aplicación?</strong> En OrienteGo, la respuesta es un rotundo no. Nuestra plataforma funciona directamente desde el navegador de tu teléfono, y aquí te explicamos por qué eso es una ventaja enorme para ti.</p>

      <h2>1. Cero descargas, cero espacio ocupado</h2>
      <p>Las aplicaciones nativas en Venezuela pueden pesar entre 50 y 150 MB solo en la instalación inicial, sin contar las actualizaciones constantes. Con una conexión de datos móviles, eso se traduce en <strong>minutos de espera y costos reales</strong> para tu bolsillo. Con OrienteGo, solo abres el navegador y listo.</p>

      <blockquote>
        <p>"La mejor app es la que no tienes que descargar. Acceder a OrienteGo me tomó exactamente 10 segundos desde mi teléfono." — María J., pasajera en Yaguaraparo.</p>
      </blockquote>

      <h2>2. Siempre actualizada, sin pedirte permiso</h2>
      <p>¿Cuántas veces te has encontrado con el mensaje "Actualiza tu app para continuar"? Con una aplicación web, cada vez que abres la plataforma ya estás usando la versión más reciente. Nuestro equipo puede corregir errores y lanzar nuevas funciones <strong>sin interrumpir tu experiencia</strong>.</p>

      <h2>3. Funciona en cualquier teléfono</h2>
      <p>No importa si tienes un Android de última generación o un teléfono de gama básica con Android 8. Si tu dispositivo puede abrir WhatsApp Web o Instagram desde el navegador, puede usar OrienteGo. No hay restricciones de versión de sistema operativo ni de marca.</p>

      <ul>
        <li>Compatible con Chrome, Firefox, Samsung Internet y Safari.</li>
        <li>Funciona en Android e iOS sin distinción.</li>
        <li>No requiere permisos especiales del sistema operativo.</li>
      </ul>

      <h2>4. Menor consumo de datos móviles</h2>
      <p>Las apps nativas suelen tener procesos en segundo plano que consumen datos constantemente: sincronización de notificaciones, actualizaciones automáticas, seguimiento de ubicación en reposo. Nuestra web app <strong>solo consume datos cuando la estás usando activamente</strong>, respetando tu plan de datos.</p>

      <blockquote>
        <p>Según estudios de UX móvil en Latinoamérica, los usuarios en zonas con conectividad limitada prefieren soluciones web por un margen del 68% frente a apps nativas.</p>
      </blockquote>

      <h2>5. Tu información está más segura</h2>
      <p>Las aplicaciones nativas pueden solicitar acceso a tu cámara, micrófono, contactos y ubicación en todo momento. Una aplicación web solo accede a lo que tú autorizas en el momento que lo necesitas, y <strong>esos permisos se revocan automáticamente</strong> cuando cierras el navegador.</p>

      <h2>Conclusión</h2>
      <p>La elección de ser una plataforma web no es una limitación tecnológica, es una decisión estratégica pensada para ti, para el oriente venezolano, para la realidad de nuestra región. En OrienteGo creemos que la tecnología debe adaptarse a las personas, y no al revés.</p>
      <p>¿Listo para probarlo? Abre tu navegador y entra a <strong>app.orientego.com</strong> ahora mismo.</p>
    `,
  },
  {
    id: "2",
    slug: "movilidad-digital-yaguaraparo",
    category: "Comunidad",
    title: "Impacto de la movilidad digital en el comercio de Yaguaraparo.",
    snippet:
      "Cómo la conectividad de transporte transforma el acceso al mercado local y genera oportunidades para comerciantes y emprendedores.",
    thumbnail: blog2Thumb,
    heroImage: post2Hero,
    heroAlt: "Vendedora venezolana sonriendo en el mercado local de Yaguaraparo",
    date: "3 de febrero, 2025",
    readTime: "6 min",
    author: "Equipo OrienteGo",
    content: `
      <p>Yaguaraparo no es solo un nombre en el mapa del estado Sucre. Es una comunidad viva, con un mercado que late al ritmo de quienes cada día se esfuerzan por llevar el sustento a sus familias. Pero durante años, <strong>la incertidumbre del transporte ha sido uno de los mayores frenos</strong> para el desarrollo comercial de la región.</p>

      <h2>El problema que nadie contaba</h2>
      <p>Carlos vende peces frescos en el mercado central. Cada mañana, necesita estar en su puesto a las 6:00 AM. Pero sin un sistema de transporte confiable, algunos días espera en la parada hasta una hora, perdiendo las mejores horas de venta. Esta historia no es única: es la realidad de cientos de comerciantes en el oriente venezolano.</p>

      <blockquote>
        <p>"Antes perdía al menos 2 horas al día en esperas. Ahora sé exactamente cuándo llega mi conductor. Mi negocio cambió." — Carlos M., pescador y comerciante, Yaguaraparo.</p>
      </blockquote>

      <h2>Conectar personas es conectar economías</h2>
      <p>Cuando una persona puede moverse con confianza y a tiempo, suceden cosas extraordinarias:</p>
      <ul>
        <li>Los comerciantes llegan más temprano y aprovechan mejor el día.</li>
        <li>Los clientes de municipios vecinos pueden visitar el mercado local con regularidad.</li>
        <li>Los emprendedores pueden asistir a reuniones de negocio sin angustia.</li>
        <li>Los estudiantes universitarios acceden a clases presenciales con puntualidad.</li>
      </ul>

      <h2>El efecto multiplicador del transporte digital</h2>
      <p>Un estudio interno realizado durante nuestra fase piloto en Sucre reveló que los usuarios activos de OrienteGo <strong>aumentaron sus ingresos percibidos en un 23%</strong> simplemente por optimizar el tiempo de desplazamiento. No ganaron más dinero directamente, sino que recuperaron horas productivas que antes se perdían en esperas.</p>

      <h2>Conductores como microempresarios</h2>
      <p>La otra cara de la moneda son los conductores. En Yaguaraparo y municipios aledaños, decenas de propietarios de vehículos tienen un activo que puede generar ingresos estables. OrienteGo les ofrece una herramienta digital para <strong>monetizar ese vehículo de forma organizada, segura y digna</strong>.</p>

      <blockquote>
        <p>La movilidad no es un lujo. Es la infraestructura invisible que sostiene toda la actividad económica de una comunidad.</p>
      </blockquote>

      <h2>El futuro que construimos juntos</h2>
      <p>OrienteGo nació en el oriente venezolano porque creemos que las soluciones tecnológicas deben venir de quienes conocen los problemas de primera mano. Cada viaje completado en nuestra plataforma es un pequeño acto de resistencia y de fe en el potencial de esta región.</p>
      <p>Únete a nuestra comunidad. Regístrate hoy y sé parte del cambio.</p>
    `,
  },
  {
    id: "3",
    slug: "verificacion-conductores",
    category: "Seguridad",
    title: "Conoce nuestro estricto proceso de verificación de conductores.",
    snippet:
      "La seguridad es nuestra prioridad. Te explicamos paso a paso cómo evaluamos y verificamos a cada conductor en nuestra plataforma.",
    thumbnail: blog3Thumb,
    heroImage: post3Hero,
    heroAlt: "Conductor verificado con documentos frente a su vehículo",
    date: "20 de febrero, 2025",
    readTime: "4 min",
    author: "Equipo de Seguridad OrienteGo",
    content: `
      <p>La confianza no se declara, se construye. En OrienteGo, entendemos que poner tu seguridad en manos de un conductor desconocido requiere garantías reales, no promesas vacías. Por eso desarrollamos <strong>un proceso de verificación de múltiples capas</strong> que todo conductor debe superar antes de poder aceptar su primer viaje.</p>

      <h2>Paso 1: Registro y validación de identidad</h2>
      <p>El proceso comienza con la verificación de identidad del conductor. Solicitamos una fotografía clara de la <strong>cédula de identidad venezolana vigente</strong> y una selfie en tiempo real para confirmar que quien se registra es quien dice ser. Utilizamos validación manual por parte de nuestro equipo en esta etapa crítica.</p>

      <h2>Paso 2: Verificación del historial de manejo</h2>
      <p>Todo conductor debe presentar su <strong>licencia de conducir vigente</strong> en la categoría correspondiente al vehículo que desea usar. Verificamos que no esté vencida y que corresponda al tipo de servicio de transporte que ofrecerá en la plataforma.</p>

      <blockquote>
        <p>La seguridad no es un paso más del proceso. Es el fundamento sobre el que construimos cada función de la plataforma.</p>
      </blockquote>

      <h2>Paso 3: Documentación del vehículo</h2>
      <p>El vehículo es tan importante como el conductor. Solicitamos y revisamos:</p>
      <ul>
        <li><strong>Certificado de circulación</strong> vigente y en regla.</li>
        <li><strong>Seguro de responsabilidad civil</strong> actualizado.</li>
        <li><strong>Revisión técnica</strong> (cuando aplica según municipio).</li>
        <li>Fotografías del vehículo en condiciones limpias y en buen estado.</li>
      </ul>

      <h2>Paso 4: Revisión de antecedentes</h2>
      <p>En colaboración con las autoridades competentes y registros disponibles, realizamos una revisión básica de antecedentes. Nuestro objetivo es garantizar que ningún conductor con historial de conductas violentas pueda operar en la plataforma.</p>

      <h2>Paso 5: Evaluación continua por calificaciones</h2>
      <p>La verificación no termina con la aprobación inicial. Cada viaje completado puede ser calificado por el pasajero, y los conductores con calificaciones consistentemente bajas son suspendidos temporalmente y sometidos a una <strong>revisión interna obligatoria</strong>.</p>

      <blockquote>
        <p>"Saber que el conductor fue verificado antes de subir al carro me da una paz que antes no tenía con los taxis informales." — Luisa P., pasajera frecuente en Carúpano.</p>
      </blockquote>

      <h2>Tu seguridad, nuestra responsabilidad</h2>
      <p>Sabemos que en el oriente venezolano, como en muchos rincones del país, el transporte informal ha sido la única opción durante años. OrienteGo no juzga esa realidad, la transforma. Ofrecemos un puente entre la informalidad necesaria y la seguridad que todos merecemos.</p>
      <p>¿Eres conductor y quieres unirte a nuestra red? Regístrate hoy y comienza el proceso de verificación. <strong>Es gratuito y lo puedes hacer desde tu teléfono.</strong></p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug);
}
