import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const INSTAGRAM = "https://instagram.com/broche.cano.contable";
export const WHATSAPP = "https://wa.me/5492610000000"; // placeholder
export const EMAIL = "hola@brochecano.com.ar"; // placeholder

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="leading-tight">
          <span className="block font-serif text-lg font-semibold text-primary">Broche-Cano</span>
          <span className="block text-[11px] tracking-[0.16em] uppercase text-muted-foreground">Soluciones Contables</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <a href="/#sobre-mi" className="hover:text-primary">Sobre mí</a>
          <a href="/#servicios" className="hover:text-primary">Servicios</a>
          <a href="/#reunion" className="hover:text-primary">La reunión</a>
          <a href="/#faq" className="hover:text-primary">Preguntas</a>
        </nav>
        <Button asChild variant="hero" size="sm" className="px-4">
          <Link to="/reservar">Reservá</Link>
        </Button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">Broche-Cano</p>
          <p className="mt-1 text-sm opacity-75">Soluciones Contables · Mendoza, Argentina</p>
        </div>
        <ul className="space-y-3 text-sm">
          <li><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-80"><Instagram className="h-4 w-4" /> @broche.cano.contable</a></li>
          <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-80"><MessageCircle className="h-4 w-4" /> WhatsApp +54 9 261 000-0000</a></li>
          <li><a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:opacity-80"><Mail className="h-4 w-4" /> {EMAIL}</a></li>
        </ul>
        <div className="md:text-right">
          <Button asChild variant="hero"><Link to="/reservar">Reservá tu reunión 1 a 1</Link></Button>
        </div>
      </div>
      <p className="border-t border-primary-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Broche-Cano – Soluciones Contables
      </p>
    </footer>
  );
}
