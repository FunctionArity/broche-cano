import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Lock, LogOut, MapPin, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { adminListBookings, adminLogin, adminLogout, adminSetStatus } from "@/lib/admin.functions";
import { formatSlot } from "@/lib/slots";

export const Route = createFileRoute("/admin")({
  ssr: false,
  loader: () => adminListBookings(),
  head: () => ({
    meta: [
      { title: "Panel de reservas · Broche-Cano" },
      { name: "description", content: "Panel privado de reservas." },
      { property: "og:title", content: "Panel de reservas · Broche-Cano" },
      { property: "og:description", content: "Panel privado de reservas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const setStatus = useServerFn(adminSetStatus);
  const [busy, setBusy] = useState(false);

  if (!data.authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-hero px-5">
        <form
          className="w-full max-w-sm rounded-3xl bg-card p-8 shadow-soft"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            const password = String(new FormData(e.currentTarget).get("password") ?? "");
            const r = await login({ data: { password } });
            setBusy(false);
            if (r.ok) router.invalidate();
            else toast.error("Contraseña incorrecta");
          }}
        >
          <Lock className="h-6 w-6 text-accent" />
          <h1 className="mt-4 text-3xl text-primary-deep">Panel de reservas</h1>
          <Input name="password" type="password" autoComplete="current-password" placeholder="Contraseña" className="mt-6 h-11" />
          <Button type="submit" className="mt-4 w-full rounded-full" disabled={busy}>Entrar</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-5 py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl text-primary-deep">Próximas reuniones</h1>
          <Button variant="ghost" size="sm" onClick={async () => { await logout(); router.invalidate(); }}>
            <LogOut className="h-4 w-4" /> Salir
          </Button>
        </div>
        {data.bookings.length === 0 && <p className="mt-10 text-muted-foreground">Todavía no hay reservas.</p>}
        <ul className="mt-8 space-y-4">
          {data.bookings.map((b) => (
            <li key={b.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-xl capitalize">{formatSlot(b.slot_start)} hs</p>
                  <p className="mt-1 font-medium">{b.nombre}{b.empresa ? ` · ${b.empresa}` : ""}{b.rubro ? ` (${b.rubro})` : ""}</p>
                </div>
                <Badge variant={b.status === "confirmada" ? "default" : b.status === "cancelada" ? "destructive" : "secondary"} className="capitalize">
                  {b.status}
                </Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">{b.modalidad === "virtual" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}{b.modalidad}</span>
                <span className="capitalize">Tema: {b.tema}</span>
                <a href={`mailto:${b.email}`} className="text-primary hover:underline">{b.email}</a>
                <a href={`https://wa.me/${b.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">WhatsApp {b.whatsapp}</a>
              </div>
              {b.mensaje && <p className="mt-3 rounded-xl bg-secondary p-3 text-sm">{b.mensaje}</p>}
              {b.status !== "cancelada" && (
                <div className="mt-4 flex gap-2">
                  {b.status !== "confirmada" && (
                    <Button size="sm" className="rounded-full" onClick={async () => { await setStatus({ data: { id: b.id, status: "confirmada" } }); router.invalidate(); }}>Confirmar</Button>
                  )}
                  <Button size="sm" variant="outline" className="rounded-full" onClick={async () => { await setStatus({ data: { id: b.id, status: "cancelada" } }); router.invalidate(); }}>Cancelar</Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
