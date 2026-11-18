export const SITE_URL = "https://canonatalia.com";
export const SITE_NAME = "Cano Natalia · Soluciones Contables";
export const SITE_LOCALE = "es_AR";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

type AccountingServiceJsonLdInput = {
  imageUrl: string;
  telephone: string;
  email: string;
  sameAs: string[];
  knowsAbout: string[];
};

export function buildAccountingServiceJsonLd({
  imageUrl,
  telephone,
  email,
  sameAs,
  knowsAbout,
}: AccountingServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": absoluteUrl("/#negocio"),
    name: "Cano Natalia",
    alternateName: "Cano Natalia · Soluciones Contables",
    description:
      "Contadora Pública Nacional en Mendoza. Asesoramiento contable, impositivo, laboral y financiamiento productivo para PyMEs y emprendedores.",
    slogan: "Asesoramiento contable en Mendoza para PyMEs y emprendedores",
    url: SITE_URL,
    image: imageUrl,
    telephone,
    email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mendoza",
      addressRegion: "Mendoza",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -32.8894587,
      longitude: -68.8458386,
    },
    areaServed: [
      { "@type": "City", name: "Mendoza, Argentina" },
      { "@type": "AdministrativeArea", name: "Provincia de Mendoza, Argentina" },
    ],
    knowsAbout,
    sameAs,
  };
}

type FaqJsonLdInput = {
  faqs: { q: string; a: string }[];
};

export function buildFaqJsonLd({ faqs }: FaqJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}
