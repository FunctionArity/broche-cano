CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_start timestamptz NOT NULL,
  nombre text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  empresa text,
  rubro text,
  modalidad text NOT NULL,
  tema text NOT NULL,
  mensaje text,
  status text NOT NULL DEFAULT 'pendiente',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX bookings_active_slot ON public.bookings(slot_start) WHERE status <> 'cancelada';