import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { availableSlots, slotToIso } from "./slots";

const dateSchema = z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) });

async function takenFor(date: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const from = slotToIso(date, "00:00");
  const to = new Date(new Date(from).getTime() + 86400000).toISOString();
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("slot_start")
    .neq("status", "cancelada")
    .gte("slot_start", from)
    .lt("slot_start", to);
  if (error) throw new Error("No se pudo consultar la agenda");
  return (data ?? []).map((r) => r.slot_start);
}

export const getAvailableSlots = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => dateSchema.parse(d))
  .handler(async ({ data }) => availableSlots(data.date, await takenFor(data.date)));

export const bookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  nombre: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  whatsapp: z.string().trim().min(6).max(30),
  empresa: z.string().trim().max(120).optional().default(""),
  rubro: z.string().trim().max(120).optional().default(""),
  modalidad: z.enum(["virtual", "presencial"]),
  tema: z.enum(["impuestos", "laboral", "contabilidad", "financiamiento", "otro"]),
  mensaje: z.string().trim().max(1000).optional().default(""),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingSchema.parse(d))
  .handler(async ({ data }) => {
    const free = availableSlots(data.date, await takenFor(data.date));
    if (!free.includes(data.time)) {
      return { ok: false as const, error: "Ese horario ya no está disponible. Elegí otro." };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const slot_start = slotToIso(data.date, data.time);
    const { error } = await supabaseAdmin.from("bookings").insert({
      slot_start,
      nombre: data.nombre,
      email: data.email,
      whatsapp: data.whatsapp,
      empresa: data.empresa || null,
      rubro: data.rubro || null,
      modalidad: data.modalidad,
      tema: data.tema,
      mensaje: data.mensaje || null,
    });
    if (error) {
      return { ok: false as const, error: "Ese horario acaba de ser reservado. Elegí otro." };
    }
    return { ok: true as const, slot_start, modalidad: data.modalidad };
  });
