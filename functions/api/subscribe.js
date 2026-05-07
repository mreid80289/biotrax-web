/**
 * Cloudflare Pages Function — Waitlist signup proxy
 *
 * Path: POST /api/subscribe
 * Forwards { email } to the Beehiiv iframe-form submit endpoint.
 *
 * Why a proxy? Posting from the browser directly to embeds.beehiiv.com
 * would hit CORS issues and would also expose the form ID in the
 * page bundle. Proxying through our own /api/subscribe route keeps the
 * fetch on the same origin (no CORS), hides the third-party endpoint
 * from page source, and gives us a place to add server-side checks
 * (rate limiting, email validation, abuse signals) later.
 *
 * The form ID below is for the BioTrax website waitlist form,
 * confirmed working at /6434a1e6-5313-403a-b0d4-2567aab41991.
 * If we ever rotate forms, change BEEHIIV_FORM_ID once here.
 */

const BEEHIIV_FORM_ID = '6434a1e6-5313-403a-b0d4-2567aab41991';
const BEEHIIV_SUBMIT_URL = `https://embeds.beehiiv.com/${BEEHIIV_FORM_ID}/submissions`;

// RFC 5322-ish — good enough; full RFC validation isn't worth the regex.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request }) {
  // 1. Parse + validate input
  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid request body' });
  }

  const email = (payload?.email || '').trim().toLowerCase();
  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return jsonResponse(400, { ok: false, error: 'Please enter a valid email address.' });
  }

  // 2. Forward to Beehiiv. The iframe form posts as multipart/form-data,
  //    but the endpoint accepts standard application/x-www-form-urlencoded
  //    just as well — and URLSearchParams is simpler.
  const beehiivBody = new URLSearchParams({ 'email[address]': email });

  let beehiivResponse;
  try {
    beehiivResponse = await fetch(BEEHIIV_SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json, text/plain, */*',
        // Beehiiv's endpoint expects a referer that matches the form's
        // host. Spoofing the iframe's own URL keeps us looking legit.
        'Referer': `https://embeds.beehiiv.com/${BEEHIIV_FORM_ID}`,
        'Origin': 'https://embeds.beehiiv.com',
      },
      body: beehiivBody.toString(),
    });
  } catch (err) {
    // Network / DNS / TLS problem reaching Beehiiv. Don't lie to user.
    return jsonResponse(502, { ok: false, error: 'Could not reach the signup service. Please try again in a moment.' });
  }

  // 3. Beehiiv returned. Treat any 2xx as a successful subscription;
  //    treat any 4xx as a soft success too IF the body looks like a
  //    "duplicate / already subscribed" signal. Anything else is a real failure.
  if (beehiivResponse.ok) {
    return jsonResponse(200, { ok: true });
  }

  // Read body once for diagnostic + duplicate detection.
  const text = await beehiivResponse.text().catch(() => '');
  const isDuplicate = /already|duplicate|exists|subscribed/i.test(text);
  if (isDuplicate) {
    return jsonResponse(200, { ok: true, duplicate: true });
  }

  // Surface a generic friendly error to the user; log details server-side.
  console.error('[subscribe] beehiiv non-ok', beehiivResponse.status, text.slice(0, 500));
  return jsonResponse(502, {
    ok: false,
    error: "Something went wrong on our end. Please try again — we'll fix it fast.",
  });
}

// Reject everything that isn't POST. Helpful to surface a clear
// 405 instead of a confusing 404 if someone hits the URL in a browser.
export async function onRequest({ request }) {
  if (request.method === 'POST') {
    // Won't actually run — onRequestPost handles POST. This branch
    // exists only because Cloudflare invokes onRequest for unhandled methods.
    return jsonResponse(500, { ok: false, error: 'Routing error' });
  }
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { 'Allow': 'POST', 'Content-Type': 'text/plain' },
  });
}
