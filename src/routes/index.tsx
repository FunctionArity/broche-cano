import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BadgeCheck, Briefcase, Calculator, CalendarDays, CheckCircle2, ClipboardList, GraduationCap, Landmark, MapPin, Quote, Receipt, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteFooter, SiteHeader } from "@/components/site";
import estudio from "@/assets/estudio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "[Tu nombre] · Contadora Pública en Mendoza | Broche-Cano" },
      { name: "description", content: "Ayudo a PyMEs y emprendedores de Mendoza a ordenar sus números y acceder a financiamiento productivo. Reservá tu reunión 1 a 1." },
      { property: "og:title", content: "[Tu nombre] · Contadora Pública en Mendoza" },
      { property: "og:description", content: "Asesoría impositiva, laboral, contable y financiamiento productivo para PyMEs. Reservá tu reunión 1 a 1." },
    ],
  }),
  component: Index,
});

const servicios = [
  { icon: Receipt, t: "Asesoría impositiva", d: "Monotributo, Responsables Inscriptos, Ingresos Brutos y planificación fiscal para que pagues lo justo y sin sorpresas." },
  { icon: Users, t: "Asesoría laboral", d: "Altas, liquidación de sueldos, convenios y cargas sociales para que tu equipo y tu empresa estén en regla." },
  { icon: Calculator, t: "Contabilidad para PyMEs", d: "Registros, balances e información clara para tomar decisiones con tus números a la vista." },
];

const etapas = [
  { n: "01", t: "Diagnóstico y encuadre", d: "Analizamos tu empresa y elegimos la línea que mejor encaja: CFI, Mendoza Fiduciaria (Mendoza Produce) o Banco Nación." },
  { n: "02", t: "Preparación de la documentación", d: "Armamos la carpeta completa: estados contables, proyecciones, plan de inversión y requisitos formales." },
  { n: "03", t: "Acompañamiento hasta el desembolso", d: "Te acompaño en cada observación y trámite hasta que el crédito llega a tu cuenta." },
];

const faqs = [
  { q: "¿Cuánto dura la reunión?", a: "45 minutos. Es tiempo suficiente para entender tu situación y llevarte próximos pasos concretos." },
  { q: "¿Cuánto cuesta la primera reunión?", a: "[Completar: costo de la primera reunión o si es sin cargo]." },
  { q: "¿Es virtual o presencial?", a: "Como prefieras: virtual por Google Meet o presencial en el estudio, en Mendoza. Lo elegís al reservar." },
  { q: "¿Qué tengo que traer?", a: "Tu CUIT, la última declaración jurada o constancia de inscripción y, si querés hablar de financiamiento, una idea del monto y destino de la inversión. Si no tenés todo, no pasa nada: arrancamos igual." },
];

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-24">
          <div>
            <p className="eyebrow">Contadora Pública Nacional · Mendoza</p>
            <h1 className="mt-5 text-5xl leading-[1.05] text-primary-deep md:text-7xl">[Tu nombre]</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Te ayudo a <em className="font-serif text-foreground">ordenar tus números</em> y a acceder al financiamiento que tu PyME necesita para crecer.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="hero" size="xl"><Link to="/reservar"><CalendarDays className="h-5 w-5" /> Reservá tu reunión 1 a 1</Link></Button>
              <a href="#servicios" className="px-2 text-sm font-medium text-primary underline-offset-4 hover:underline">Ver servicios →</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-primary" /> Desde 2022</span>
              <span className="inline-flex items-center gap-1.5"><Award className="h-4 w-4 text-accent" /> Tango Elite 5★ 2026</span>
            </div>
          </div>
          <div className="relative">
            <img src={estudio} alt="Escritorio del estudio con vista a los Andes" width={1280} height={960} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft md:aspect-[4/5]" />
            <div className="absolute -bottom-6 -left-4 rounded-2xl bg-card p-4 shadow-soft md:-left-8">
              <p className="text-xs text-muted-foreground">Nuevo servicio</p>
              <p className="font-serif text-lg text-primary">Financiamiento productivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre mí */}
      <section id="sobre-mi" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="flex aspect-[4/5] items-center justify-center rounded-[2rem] border-2 border-dashed border-border bg-secondary text-sm text-muted-foreground">
          [Tu foto]
        </div>
        <div>
          <p className="eyebrow">Sobre mí</p>
          <h2 className="mt-4 text-4xl text-primary-deep md:text-5xl">Números claros, decisiones tranquilas.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Soy Contadora Pública Nacional y desde 2022 acompaño de forma independiente a PyMEs y emprendedores de Mendoza en temas impositivos, laborales y contables. Creo en una contabilidad cercana: que entiendas qué pasa en tu negocio y por qué.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Mi formación en tutoría de emprendedores me permite mirar más allá del vencimiento del mes: te ayudo a planificar, a crecer y a conseguir el financiamiento para hacerlo.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { i: Briefcase, t: "Contadora Pública Nacional" },
              { i: GraduationCap, t: "Diplomado en tutoría de emprendedores" },
              { i: Award, t: "Tango Elite 5★ · Tango Software 2026" },
            ].map(({ i: I, t }) => (
              <li key={t} className="rounded-2xl border border-border bg-card p-4 text-sm font-medium">
                <I className="mb-2 h-5 w-5 text-accent" />{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">Servicios</p>
          <h2 className="mt-4 max-w-2xl text-4xl text-primary-deep md:text-5xl">Todo lo que tu PyME necesita, en un solo lugar.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {servicios.map(({ icon: I, t, d }) => (
              <article key={t} className="rounded-3xl bg-card p-7 shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent"><I className="h-5 w-5" /></span>
                <h3 className="mt-5 text-2xl text-primary-deep">{t}</h3>
                <p className="mt-3 text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>

          <article className="mt-6 overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <Landmark className="h-6 w-6 text-accent" />
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">Nuevo</span>
            </div>
            <h3 className="mt-5 text-3xl md:text-4xl">Asesoría en financiamiento productivo</h3>
            <p className="mt-3 max-w-2xl opacity-85">
              Te ayudo a acceder a líneas de crédito del CFI, Mendoza Fiduciaria (como Mendoza Produce) y Banco Nación para invertir en maquinaria, capital de trabajo o expansión.
            </p>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {etapas.map((e) => (
                <li key={e.n} className="border-t border-primary-foreground/20 pt-5">
                  <span className="font-serif text-3xl text-accent">{e.n}</span>
                  <h4 className="mt-2 text-xl">{e.t}</h4>
                  <p className="mt-2 text-sm opacity-80">{e.d}</p>
                </li>
              ))}
            </ol>
            <Button asChild variant="hero" className="mt-10"><Link to="/reservar">Consultá por financiamiento</Link></Button>
          </article>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="reunion" className="mx-auto max-w-6xl px-5 py-24">
        <p className="eyebrow">Reunión 1 a 1</p>
        <h2 className="mt-4 text-4xl text-primary-deep md:text-5xl">Así de simple.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { i: CalendarDays, t: "Elegí el día y horario", d: "Ves la agenda real y elegís el turno que te quede cómodo." },
            { i: ClipboardList, t: "Completá tus datos", d: "Contame brevemente sobre tu negocio y qué querés resolver." },
            { i: CheckCircle2, t: "Recibí la confirmación", d: "Te confirmo la reunión por email o WhatsApp." },
          ].map(({ i: I, t, d }, idx) => (
            <div key={t}>
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl text-accent/70">{idx + 1}</span>
                <I className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-3 text-2xl">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6 text-sm">
            <span className="inline-flex items-center gap-2"><Video className="h-5 w-5 text-primary" /> Virtual por Google Meet</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Presencial en Mendoza</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> 45 minutos</span>
          </div>
          <Button asChild variant="hero"><Link to="/reservar">Reservá tu reunión 1 a 1</Link></Button>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">Testimonios</p>
          <h2 className="mt-4 text-4xl text-primary-deep md:text-5xl">Lo que dicen quienes ya trabajan conmigo.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <figure key={n} className="rounded-3xl bg-card p-7">
                <Quote className="h-6 w-6 text-accent" />
                <blockquote className="mt-4 font-serif text-lg italic text-muted-foreground">“[Testimonio de cliente {n}]”</blockquote>
                <figcaption className="mt-5 text-sm font-semibold">[Nombre] · <span className="font-normal text-muted-foreground">[Empresa / rubro]</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-24">
        <p className="eyebrow">Preguntas frecuentes</p>
        <h2 className="mt-4 text-4xl text-primary-deep md:text-5xl">Antes de reservar</h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <SiteFooter />
    </div>
  );
}
