// Cloudflare Pages Function: POST /api/enquiry
// Stores the enquiry in Supabase (service role — never exposed client-side),
// notifies the business by email, returns a reference number.
// Runs on Cloudflare's edge; no secrets in frontend code (brief §18/§40).
import { validateEnquiry, makeReference, enquiryEmailBody, type EnquiryInput } from '../../src/lib/enquiry';
import { sendEnquiryNotification, verifyTurnstile } from '../../src/lib/email';
import { site } from '../../src/config/site';

export const onRequestPost: PagesFunction<{ SUPABASE_URL: string; SUPABASE_SERVICE_ROLE_KEY: string; RESEND_API_KEY?: string; ENQUIRY_FROM_EMAIL?: string; TURNSTILE_SECRET_KEY?: string }> = async ({ request, env }) => {
  const ip = request.headers.get('cf-connecting-ip') ?? '';
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  // 1. Turnstile (primary bot defense when configured) + honeypot via validation
  const turnstileOk = await verifyTurnstile(String(body.turnstileToken ?? ''), ip, env as unknown as Record<string, string | undefined>);
  if (!turnstileOk) return json({ ok: false, error: 'Spam protection failed. Please retry.' }, 403);

  // 2. Server-side validation
  const result = validateEnquiry(body);
  if (!result.ok) return json({ ok: false, errors: result.errors }, 422);
  const enquiry: EnquiryInput = result.value;
  const reference = makeReference();

  // 3. Persist via Supabase REST (service role)
  let stored = false;
  try {
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/enquiries`, {
      method: 'POST',
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        reference_no: reference,
        name: enquiry.name,
        company: enquiry.company ?? null,
        email: enquiry.email,
        phone: enquiry.phone,
        city: enquiry.city,
        state: enquiry.state ?? null,
        site_location: enquiry.siteLocation ?? null,
        equipment_type: enquiry.equipmentType,
        brand: enquiry.brand ?? null,
        model: enquiry.model ?? null,
        capacity: enquiry.capacity ?? null,
        fuel_type: enquiry.fuelType ?? null,
        requirement: enquiry.requirement,
        urgency: enquiry.urgency,
        description: enquiry.description ?? null,
        locale: enquiry.locale ?? 'en',
      }),
    });
    stored = res.ok || res.status === 201;
    if (!stored) console.error('[enquiry] supabase insert failed', res.status, await res.text());
  } catch (err) {
    console.error('[enquiry] supabase unreachable', err);
  }

  // 4. Notify the business (non-fatal if email unconfigured)
  const text = enquiryEmailBody(enquiry, reference);
  const emailSent = await sendEnquiryNotification(
    { to: site.email, subject: `Service request ${reference} — ${enquiry.equipmentType} (${enquiry.requirement})`, text, replyTo: enquiry.email },
    env as unknown as Record<string, string | undefined>
  );

  // 5. Respond. If persistence failed we still return the reference and a
  //    WhatsApp fallback path so the lead is never lost.
  return json({
    ok: true,
    reference,
    stored,
    emailSent,
    whatsappFollowUp: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello NEEL ENTERPRISES, my service request reference is ${reference}.`)}`,
  }, 201);
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
