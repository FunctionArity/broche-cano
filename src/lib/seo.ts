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
};

export function buildAccountingServiceJsonLd({
  imageUrl,
  telephone,
  email,
  sameAs,
}: AccountingServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "Cano Natalia",
    alternateName: "Cano Natalia · Soluciones Contables",
    description:
      "Contadora Pública Nacional en Mendoza. Asesoría impositiva, laboral, contable y financiamiento productivo para PyMEs.",
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
    areaServed: {
      "@type": "City",
      name: "Mendoza, Argentina",
    },
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
