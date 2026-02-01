import {
  BookCheck,
  Navigation,
  Goal,
  Users,
  Zap,
  Home,
  Calculator,
} from "lucide-react";

export const services = [
  {
    id: 1,
    slug: "estado-parcelario-provincia-buenos-aires",
    icon: Goal,
    title: "Estado Parcelario en la Provincia de Buenos Aires",
    subtitle: "Certificación catastral obligatoria - Ley 10.707",
    description:
      "El Estado Parcelario en la Provincia de Buenos Aires es obligatorio según la Ley 10.707/94 al momento de una venta, hipoteca o cualquier acto de transmisión de derechos reales. Realizamos la certificación oficial de medidas y límites del inmueble, verificación de documentación catastral ante ARBA e informe técnico completo para escrituración. Nuestro servicio incluye el relevamiento técnico, generación del plano georreferenciado, registro en el Catastro y obtención de la cédula catastral correspondiente.",
    features: [
      "Certificación de medidas y límites del inmueble conforme a Ley 10.707",
      "Verificación de documentación catastral ante ARBA",
      "Relevamiento técnico y plano georreferenciado",
      "Constitución y verificación de Estado Parcelario",
      "Obtención de cédula catastral y resumen valuatorio",
      "Asesoramiento legal en el proceso"
    ],
    image: "/servicios/estados-parcelarios-1.jpg",
    category: "Catastral",
    duration: "24-48 horas",
    complexity: "Baja",
    highlights: ["Obligatorio", "Rápido", "Oficial"]
  },
  {
    id: 9,
    slug: "estado-parcelario-caba",
    icon: Goal,
    title: "Estado Parcelario en Ciudad de Buenos Aires (CABA)",
    subtitle: "Certificación catastral obligatoria - Ley 6437",
    description:
      "El Estado Parcelario en la Ciudad Autónoma de Buenos Aires es obligatorio según la Ley de Catastro N° 6437 para actos de constitución, modificación y transmisión de derechos reales. Realizamos la certificación oficial cumpliendo con todos los elementos esenciales: nomenclatura catastral, ubicación georreferenciada, límites del inmueble, medidas, restricciones, tipificación de mejoras y partida inmobiliaria. Nuestro servicio incluye la constitución mediante acto de mensura registrado y la verificación de subsistencia según los plazos establecidos.",
    features: [
      "Certificación conforme a Ley de Catastro N° 6437",
      "Constitución mediante acto de mensura registrado",
      "Elementos esenciales y complementarios del Estado Parcelario",
      "Verificación de subsistencia según plazos vigentes",
      "Certificado del Estado Parcelario otorgado por el Organismo Catastral",
      "Asesoramiento en normativas específicas de CABA"
    ],
    image: "/servicios/certifParcCaba_Página_1.jpg",
    category: "Catastral",
    duration: "3-5 días",
    complexity: "Media",
    highlights: ["Obligatorio", "Oficial", "CABA"]
  },
  {
    id: 2,
    slug: "planos-mensura",
    icon: BookCheck,
    title: "Planos de Mensura para División, Unificación, Anexión o Usucapión",
    subtitle: "Medición y documentación oficial",
    description:
      "Este plano es la medición, ubicación y documentación de un inmueble y sus límites conforme a las causas jurídicas que lo originan, es decir, la aplicación del título de propiedad al terreno propiamente dicho. La mensura es la generadora de las parcelas catastrales y constituye la base legal para la identificación precisa de los límites y superficie de cada propiedad.",
    features: [
      "Medición precisa de terrenos",
      "Delimitación de linderos",
      "Documentación técnica completa",
      "Plano catastral oficial",
      "Certificación profesional"
    ],
    image: "/servicios/planos-mensura.jpg",
    category: "Catastral",
    duration: "3-7 días",
    complexity: "Media",
    highlights: ["Preciso", "Oficial", "Completo"]
  },
  {
    id: 3,
    slug: "declaraciones-juradas-revaluos",
    icon: Users,
    title: "Declaraciones Juradas (revalúos)",
    subtitle: "Actualización de valores catastrales",
    description:
      "Servicio especializado en la elaboración de Declaraciones Juradas de Revalúo para la actualización periódica de valores catastrales de inmuebles ante ARBA. A través de un análisis detallado y preciso, determinamos el valor actualizado considerando ubicación, dimensiones, uso del suelo y mejoras realizadas. Estas declaraciones son fundamentales para trámites fiscales, actualizaciones catastrales y procesos legales relacionados con la propiedad.",
    features: [
      "Elaboración de Declaraciones Juradas de Revalúo",
      "Actualización de valores catastrales ante ARBA",
      "Análisis detallado de ubicación, dimensiones y mejoras",
      "Cumplimiento de normativas fiscales vigentes",
      "Asesoramiento fiscal inmobiliario",
      "Gestión ante organismos recaudadores"
    ],
    image: "/servicios/declaraciones-juradas-1.jpg",
    category: "Fiscal",
    duration: "2-5 días",
    complexity: "Media",
    highlights: ["Oficial", "Actualizado", "Fiscal"]
  },
  {
    id: 4,
    slug: "relevamientos-topograficos",
    icon: Navigation,
    title: "Relevamientos topográficos",
    subtitle: "Mediciones precisas para proyectos",
    description:
      "Realizamos relevamientos planialtimétricos detallados para obras civiles, infraestructura y estudios de terreno, proporcionando mediciones precisas sobre la forma, dimensiones y características del terreno. Utilizamos equipos avanzados como estaciones totales y sistemas GPS/GNSS de alta precisión para garantizar la exactitud de la información recopilada. Estos relevamientos son fundamentales para la planificación y ejecución de proyectos de construcción.",
    features: [
      "Relevamientos planialtimétricos detallados",
      "Mediciones precisas de forma, dimensiones y características",
      "Equipos avanzados: estaciones totales y GPS/GNSS",
      "Aplicación en obras civiles e infraestructura",
      "Estudios técnicos para planificación de proyectos",
      "Cumplimiento con normativas profesionales vigentes"
    ],
    image: "/servicios/EjemploRelevamientoTopografico.jpg",
    category: "Topografía",
    duration: "2-5 días",
    complexity: "Media",
    highlights: ["Preciso", "Tecnología GNSS", "Completo"]
  },
  {
    id: 5,
    slug: "amojonamientos",
    icon: Zap,
    title: "Amojonamientos",
    subtitle: "Delimitación física de límites",
    description:
      "Delimitación física y precisa de los límites de una propiedad mediante la colocación de mojones o hitos en sus vértices, estableciendo de manera permanente los linderos del terreno. Este procedimiento es esencial para prevenir disputas de linderos, facilitar la construcción de cercas o muros perimetrales, y asegurar el respeto de las dimensiones legales del inmueble. Realizado con equipos de alta precisión topográfica y conforme a normativas legales.",
    features: [
      "Colocación de mojones oficiales en vértices del terreno",
      "Delimitación física precisa de límites y linderos",
      "Prevención y resolución de conflictos de límites",
      "Equipos de alta precisión topográfica",
      "Acta de amojonamiento conforme a normativas legales",
      "Certificación de límites para seguridad jurídica"
    ],
    image: "/servicios/amojonamientos.jpg",
    category: "Topografía",
    duration: "1-3 días",
    complexity: "Media",
    highlights: ["Preciso", "Oficial", "Seguridad jurídica"]
  },
  {
    id: 8,
    slug: "subdivisiones-ph",
    icon: Home,
    title: "Subdivisiones en PH",
    subtitle: "División y modificación de unidades en Propiedad Horizontal",
    description:
      "Servicio especializado en la división y modificación de unidades funcionales dentro del régimen de Propiedad Horizontal. Realizamos planos técnicos precisos para subdividir unidades existentes, unificar espacios, crear nuevas unidades funcionales o complementarias, y actualizar la documentación catastral y registral correspondiente. Este servicio es fundamental para adaptar los espacios a nuevas necesidades, maximizar el aprovechamiento de los inmuebles y cumplir con todas las normativas legales y reglamentos de copropiedad vigentes.",
    features: [
      "Planos técnicos para subdivisión de unidades funcionales",
      "Unificación de unidades existentes",
      "Creación de nuevas unidades funcionales o complementarias",
      "Actualización de documentación catastral y registral",
      "Cumplimiento con reglamentos de copropiedad",
      "Asesoramiento técnico y legal en el proceso"
    ],
    image: "/servicios/subdivisiones.jpg",
    category: "Catastral",
    duration: "5-10 días",
    complexity: "Alta",
    highlights: ["Preciso", "Oficial", "Completo"]
  },
  {
    id: 6,
    slug: "calculos-superficie",
    icon: Calculator,
    title: "Cálculos de Superficie",
    subtitle: "Determinación precisa de áreas",
    description:
      "Cálculos especializados de superficies para terrenos irregulares, propiedades complejas y proyectos que requieren máxima precisión en la determinación de áreas. Realizamos cálculos detallados considerando todas las irregularidades del terreno, utilizando métodos topográficos avanzados y software especializado para garantizar la exactitud en la medición de áreas cubiertas, semicubiertas y descubiertas.",
    features: [
      "Cálculo de superficies para terrenos irregulares",
      "Análisis detallado de áreas cubiertas y descubiertas",
      "Certificación profesional de superficies",
      "Informe técnico detallado con metodología empleada",
      "Asesoramiento técnico en mediciones de área",
      "Aplicación en proyectos de construcción y división"
    ],
    image: "/otros-servicos-page/otros-servicios-page-5.png",
    category: "Cálculos",
    duration: "1-2 días",
    complexity: "Media",
    highlights: ["Preciso", "Certificado", "Rápido"]
  },
  {
    id: 7,
    slug: "certificados-dominio",
    icon: Home,
    title: "Certificados de Dominio",
    subtitle: "Verificación legal de la propiedad",
    description:
      "Certificación oficial que acredita la titularidad dominial de un inmueble, incluyendo la verificación de gravámenes, embargos y restricciones de dominio. Este documento es fundamental para transacciones inmobiliarias, ya que proporciona información detallada sobre el estado jurídico del inmueble, permitiendo verificar que no existan impedimentos legales para su transferencia o transacción.",
    features: [
      "Verificación de titularidad dominial",
      "Análisis completo de gravámenes y embargos",
      "Certificado oficial ante registro de la propiedad",
      "Informe detallado del estado jurídico",
      "Asesoramiento legal en el proceso",
      "Actualización de información catastral"
    ],
    image: "/otros-servicos-page/otros-servicios-page-2.jpg",
    category: "Legal",
    duration: "1-3 días",
    complexity: "Baja",
    highlights: ["Oficial", "Rápido", "Confiable"]
  },
];
