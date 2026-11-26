interface Env { ADMIN_PASSWORD?: string; ADMIN_SESSION_SECRET?: string }
const encoder = new TextEncoder();
const COOKIE = "arena_admin_session";
const MAX_AGE = 60 * 60 * 12;

async function signature(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) return Response.json({ error: "Admin secrets are not configured in Cloudflare." }, { status: 503 });
  let body: { password?: string };
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const supplied = typeof body.password === "string" ? body.password : "";
  const a = encoder.encode(supplied), b = encoder.encode(env.ADMIN_PASSWORD);
  let mismatch = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i++) mismatch |= (a[i] || 0) ^ (b[i] || 0);
  if (mismatch !== 0) return Response.json({ error: "Incorrect password." }, { status: 401 });
  const issued = String(Math.floor(Date.now() / 1000));
  const token = issued + "." + await signature(issued, env.ADMIN_SESSION_SECRET);
  return Response.json({ ok: true }, { headers: {
    "Set-Cookie": COOKIE + "=" + token + "; HttpOnly; Secure; SameSite=Strict; Path=/api/admin; Max-Age=" + MAX_AGE,
    "Cache-Control": "no-store"
  }});
};
