import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarCheck2, Clock, Loader2, MapPin, Video } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { es } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteFooter, SiteHeader } from "@/components/site";
import { createBooking, getAvailableSlots } from "@/lib/bookings.functions";
import { formatSlot, mendozaToday } from "@/lib/slots";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reservar")({
  head: () => ({
    meta: [
      { title: "Reservá tu reunión 1 a 1 · Broche-Cano Soluciones Contables" },
      { name: "description", content: "Elegí día y horario para tu reunión de 45 minutos, virtual o presencial en Mendoza." },
      { property: "og:title", content: "Reservá tu reunión 1 a 1 · Broche-Cano" },
      { property: "og:description", content: "Agenda online: elegí día y horario para tu reunión de 45 minutos con tu contadora." },
    ],
  }),
  component: Reservar,
});

const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

type Done = { slot_start: string; modalidad: string };

function Reservar() {
  const [day, setDay] = useState<Date | undefined>();
  const [time, setTime] = useState<string | null>(null);
  const [modalidad, setModalidad] = useState<"virtual" | "presencial">("virtual");
  const [tema, setTema] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const fetchSlots = useServerFn(getAvailableSlots);
  const book = useServerFn(createBooking);
  const dateKey = day ? toKey(day) : null;

  const slots = useQuery({
    queryKey: ["slots", dateKey],
    queryFn: () => fetchSlots({ data: { date: dateKey! } }),
    enabled: !!dateKey,
  });

  const todayKey = mendozaToday();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!dateKey || !time) { toast.error("Elegí un día y un horario."); return; }
    if (!tema) { toast.error("Elegí el tema principal."); return; }
    const f = new FormData(e.currentTarget);
    setSending(true);
    try {
      const res = await book({
        data: {
          date: dateKey,
          time,
          nombre: String(f.get("nombre") ?? ""),
          email: String(f.get("email") ?? ""),
          whatsapp: String(f.get("whatsapp") ?? ""),
          empresa: String(f.get("empresa") ?? ""),
          rubro: String(f.get("rubro") ?? ""),
          modalidad,
          tema: tema as "otro",
          mensaje: String(f.get("mensaje") ?? ""),
        },
      });
      if (!res.ok) {
        toast.error(res.error);
        setTime(null);
        slots.refetch();
      } else {
        setDone({ slot_start: res.slot_start, modalidad: res.modalidad });
        window.scrollTo({ top: 0 });
      }
    } catch {
      toast.error("Revisá los datos: nombre, email y WhatsApp son obligatorios.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="bg-hero">
        <div className="mx-auto max-w-5xl px-5 py-14 md:py-20">
          {done ? (
            <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 text-center shadow-soft md:p-12">
              <CalendarCheck2 className="mx-auto h-12 w-12 text-accent" />
              <h1 className="mt-5 text-4xl text-primary-deep">¡Reserva recibida!</h1>
              <p className="mt-3 text-muted-foreground">Te voy a escribir para confirmar la reunión.</p>
              <div className="mt-8 space-y-3 rounded-2xl bg-secondary p-5 text-left">
                <p className="flex items-center gap-3 font-medium capitalize"><Clock className="h-5 w-5 text-primary" /> {formatSlot(done.slot_start)} hs</p>
                <p className="flex items-center gap-3">
                  {done.modalidad === "virtual" ? <Video className="h-5 w-5 text-primary" /> : <MapPin className="h-5 w-5 text-primary" />}
                  {done.modalidad === "virtual" ? "Virtual · Google Meet" : "Presencial · Mendoza"} · 45 minutos
                </p>
              </div>
              <Button asChild variant="outline" className="mt-8 rounded-full"><Link to="/">Volver al inicio</Link></Button>
            </div>
          ) : (
            <>
              <p className="eyebrow">Reunión 1 a 1 · 45 min</p>
              <h1 className="mt-4 text-4xl text-primary-deep md:text-5xl">Reservá tu reunión</h1>
              <p className="mt-3 text-muted-foreground">Horarios de Mendoza. Lunes a viernes, 9 a 13 y 16 a 19 hs.</p>

              <form onSubmit={onSubmit} className="mt-10 grid gap-6 lg:grid-cols-[auto_1fr]">
                <section className="rounded-3xl bg-card p-5 shadow-soft">
                  <h2 className="mb-3 px-2 text-xl">1. Elegí el día</h2>
                  <Calendar
                    mode="single"
                    locale={es}
                    selected={day}
                    onSelect={(d) => { setDay(d); setTime(null); }}
                    disabled={(d) => toKey(d) < todayKey || d.getDay() === 0 || d.getDay() === 6}
                    className="mx-auto"
                  />
                  <h2 className="mb-3 mt-5 px-2 text-xl">2. Elegí el horario</h2>
                  <div className="px-2">
                    {!day && <p className="text-sm text-muted-foreground">Primero elegí un día.</p>}
                    {day && slots.isLoading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                    {day && slots.data && slots.data.length === 0 && (
                      <p className="text-sm text-muted-foreground">No quedan horarios este día. Probá con otro.</p>
                    )}
                    <div className="grid grid-cols-3 gap-2">
                      {slots.data?.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setTime(s)}
                          className={cn(
                            "rounded-xl border py-2 text-sm font-medium transition-colors",
                            time === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary",
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl bg-card p-6 shadow-soft md:p-8">
                  <h2 className="text-xl">3. Completá tus datos</h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field label="Nombre y apellido *" name="nombre" required maxLength={100} />
                    <Field label="Email *" name="email" type="email" required maxLength={255} />
                    <Field label="WhatsApp *" name="whatsapp" type="tel" required maxLength={30} placeholder="261 000 0000" />
                    <Field label="Empresa / emprendimiento" name="empresa" maxLength={120} />
                    <Field label="Rubro" name="rubro" maxLength={120} />
                    <div className="space-y-2">
                      <Label>Tema principal *</Label>
                      <Select value={tema} onValueChange={setTema}>
                        <SelectTrigger className="h-11"><SelectValue placeholder="Elegí un tema" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="impuestos">Impuestos</SelectItem>
                          <SelectItem value="laboral">Laboral</SelectItem>
                          <SelectItem value="contabilidad">Contabilidad</SelectItem>
                          <SelectItem value="financiamiento">Financiamiento</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Modalidad *</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {([["virtual", "Virtual · Meet", Video], ["presencial", "Presencial · Mendoza", MapPin]] as const).map(([v, l, I]) => (
                          <button
                            type="button"
                            key={v}
                            onClick={() => setModalidad(v)}
                            className={cn(
                              "flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium",
                              modalidad === v ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary",
                            )}
                          >
                            <I className="h-4 w-4" /> {l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="mensaje">Mensaje breve</Label>
                      <Textarea id="mensaje" name="mensaje" maxLength={1000} rows={4} placeholder="Contame en pocas líneas qué querés resolver." />
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground capitalize">
                      {dateKey && time ? `${formatSlot(new Date(`${dateKey}T${time}:00-03:00`).toISOString())} hs` : "Sin horario elegido"}
                    </p>
                    <Button type="submit" variant="hero" size="xl" disabled={sending}>
                      {sending && <Loader2 className="h-4 w-4 animate-spin" />} Confirmar reserva
                    </Button>
                  </div>
                </section>
              </form>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} className="h-11" {...rest} />
    </div>
  );
}
