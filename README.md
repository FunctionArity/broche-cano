# Broche Cano

Build a personal-brand website (in Spanish, Argentina — use "vos") for a Contadora Pública Nacional based in Mendoza, Argentina, whose studio is "Broche-Cano – Soluciones Contables" (Instagram: @broche.cano.contable). The main goal of the site is to let visitors book a 1-to-1 meeting with her.

About her (use for copy):
- Independent practice since 2022 advising PyMEs and entrepreneurs on tax, labor and accounting matters.
- Holds a diplomado in tutoría de emprendedores.
- Tango Elite (5-star) recognition from Tango Software, 2026.
- New flagship service: asesoría en financiamiento productivo — helping PyMEs access credit lines from CFI, Mendoza Fiduciaria (e.g. Mendoza Produce) and Banco Nación. Three stages: (1) diagnóstico y encuadre, (2) preparación de la documentación, (3) acompañamiento hasta el desembolso.

Pages / sections (single landing page is fine, plus a booking flow):
1. Hero: name placeholder "[Tu nombre]", title "Contadora Pública Nacional · Mendoza", a one-line value proposition about helping PyMEs ordenar sus números y acceder a financiamiento, and a primary CTA "Reservá tu reunión 1 a 1".
2. Sobre mí: short bio with photo placeholder and credentials (CPN, diplomado, Tango Elite).
3. Servicios: cards for Asesoría impositiva, Asesoría laboral, Contabilidad para PyMEs, and a highlighted card for Financiamiento productivo explaining the 3 stages.
4. Cómo funciona la reunión 1 a 1: 3 simple steps (elegí el día y horario → completá tus datos → recibí la confirmación). Options: virtual (Google Meet) or presencial en Mendoza, 45 minutes.
5. Booking section/page: a calendar date picker plus available time slots (weekdays, 9:00–13:00 and 16:00–19:00, Mendoza time, 45-min slots, no weekends, no past dates, and a slot already booked must not be offered again). Form fields: nombre y apellido, email, WhatsApp, empresa/emprendimiento, rubro, modalidad (virtual/presencial), tema principal (select: impuestos, laboral, contabilidad, financiamiento, otro) and a short message. On submit save the booking to the database and show a confirmation screen with the date/time summary.
6. A simple, password-protected admin view for her to see upcoming reservations in a list ordered by date, and mark them as confirmed or cancelled.
7. Testimonials placeholder section, FAQ (duración, costo de la primera reunión — placeholder, modalidad, qué traer), and footer with Instagram, WhatsApp placeholder and email placeholder.

Design: professional, warm and trustworthy — not corporate-cold. Clean layout, generous whitespace, an elegant serif for headings and a clean sans for body, a deep green or navy primary with a warm accent; fully responsive and mobile-first since most visitors will come from WhatsApp and Instagram.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://broche-cano.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/111fc6df-0c19-4499-b13d-5994319970d1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
