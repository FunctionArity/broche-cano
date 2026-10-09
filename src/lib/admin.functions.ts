import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";

type AdminSession = { admin?: boolean };

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "bc-admin",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

async function sha(s: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));
}
async function matches(a: string, b: string) {
  const [x, y] = await Promise.all([sha(a), sha(b)]);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

async function isAdmin() {
  const s = await useSession<AdminSession>(sessionConfig());
  return !!s.data.admin;
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ password: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected || !(await matches(data.password, expected))) return { ok: false };
    const s = await useSession<AdminSession>(sessionConfig());
    await s.update({ admin: true });
    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const s = await useSession<AdminSession>(sessionConfig());
  await s.clear();
  return { ok: true };
});

export const adminListBookings = createServerFn({ method: "GET" }).handler(async () => {
  if (!(await isAdmin())) return { authorized: false as const, bookings: [] };
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - 86400000).toISOString();
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .gte("slot_start", since)
    .order("slot_start", { ascending: true });
  if (error) throw new Error("No se pudieron cargar las reservas");
  return { authorized: true as const, bookings: data ?? [] };
});

export const adminSetStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(["confirmada", "cancelada"]) }).parse(d),
  )
  .handler(async ({ data }) => {
    if (!(await isAdmin())) throw new Error("No autorizado");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("bookings").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error("No se pudo actualizar");
    return { ok: true };
  });
