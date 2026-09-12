// Email abstraction (brief §91): implementation can change without touching
// the form. Current transport: Resend HTTP API via fetch (no SDK).
// Falls back to a logged no-op when RESEND_API_KEY is absent so local dev
// and staging never fail an enquiry because email is unconfigured.

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export async function sendEnquiryNotification(msg: EmailMessage, env: Record<string, string | undefined>): Promise<boolean> {
  const key = env.RESEND_API_KEY;
  const from = env.ENQUIRY_FROM_EMAIL ?? 'onboarding@resend.dev';
  if (!key) {
    console.warn('[email] RESEND_API_KEY not set — enquiry notification skipped:', msg.subject);
    return false;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [msg.to],
        subject: msg.subject,
        text: msg.text,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('[email] send failed', err);
    return false;
  }
}

export async function verifyTurnstile(token: string, ip: string, env: Record<string, string | undefined>): Promise<boolean> {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured (dev) — form relies on honeypot
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
