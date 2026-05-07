/**
 * Cloudflare Pages Function — Waitlist signup proxy
 *
 * Path: POST /api/subscribe
 * Forwards { email } to Beehiiv's iframe-form JSON API.
 *
 * Endpoint discovered by inspecting the network request from the
 * official iframe at embeds.beehiiv.com/{form_id}. As of the April 30,
 * 2026 builder update, Beehiiv changed to:
 *
 *   POST https://embeds.beehiiv.com/api/submit
 *   Content-Type: application/json
 *   {
 *     external_embed_id: "<form_id>",
 *     publication_id:    "<pub_xxx>",
 *     email:             "<user email>",
 *     captcha_token:     "",
 *     slim:              false,
 *     user_agent:        "<browser UA>"
 *   }
 *
 * The endpoint returns CORS-permissive headers (Access-Control-Allow-Origin: *)
 * so we COULD call it from the browser directly — but proxying through our
 * own /api/subscribe route gives us a clean swap path to the official
 * /v2 API once we verify identity and get a real API key, plus a place
 * to add rate-limiting/abuse detection without touching the React code.
 */

const BEEHIIV_FORM_ID        = '6434a1e6-5313-403a-b0d4-2567aab41991';
const BEEHIIV_PUBLICATION_ID = 'pub_7cc1acc3-35a6-4901-b171-7ad2d72c3e31';
const BEEHIIV_SUBMIT_URL     = 'https://embeds.beehiiv.com/api/submit';

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

  // Pass through the visitor's user agent so Beehiiv's analytics get
  // accurate device data, not Cloudflare worker UA.
  const visitorUA = request.headers.get('user-agent')
    || 'Mozilla/5.0 (compatible; BioTraxWaitlist/1.0)';

  // 2. Build the exact JSON body Beehiiv's iframe sends.
  const beehiivBody = {
    external_embed_id: BEEHIIV_FORM_ID,
    publication_id:    BEEHIIV_PUBLICATION_ID,
    email,
    captcha_token:     '',
    slim:              false,
    user_agent:        visitorUA,
  };

  // 3. Forward to Beehiiv. Set Origin/Referer to match the iframe host
  //    so the request blends in with their normal traffic.
  let beehiivResponse;
  try {
    beehiivResponse = await fetch(BEEHIIV_SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':       'application/json, text/plain, */*',
        'Origin':       'https://embeds.beehiiv.com',
        'Referer':      `https://embeds.beehiiv.com/${BEEHIIV_FORM_ID}`,
      },
      body: JSON.stringify(beehiivBody),
    });
  } catch {
    return jsonResponse(502, { ok: false, error: 'Could not reach the signup service. Please try again in a moment.' });
  }

  // 4. Handle response. Read body once for diagnostic + duplicate detection.
  const text = await beehiivResponse.text().catch(() => '');

  if (beehiivResponse.ok) {
    return jsonResponse(200, { ok: true });
  }

  // Some 4xx responses are effectively a success — duplicate emails,
  // already-in-audience signals. Surface those as success.
  const isDuplicate = /already|duplicate|exists|subscribed/i.test(text);
  if (isDuplicate) {
    return jsonResponse(200, { ok: true, duplicate: true });
  }

  // Real failure — log full details server-side for debugging.
  console.error('[subscribe] beehiiv non-ok', beehiivResponse.status, text.slice(0, 500));
  return jsonResponse(502, {
    ok: false,
    error: "Something went wrong on our end. Please try again — we'll fix it fast.",
  });
}

// Reject non-POST methods with a clear 405.
export async function onRequest({ request }) {
  if (request.method === 'POST') {
    return jsonResponse(500, { ok: false, error: 'Routing error' });
  }
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { 'Allow': 'POST', 'Content-Type': 'text/plain' },
  });
}
