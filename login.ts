interface Env { ADMIN_PASSWORD: string; ADMIN_SESSION_SECRET: string }
const encoder = new TextEncoder();
const COOKIE = 'arena_admin_session';
const MAX_AGE = 60 * 60 * 12;
async function signature(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) return Response.json({ error: 'Admin password is not configured in Cloudflare yet.' }, { status: 503 });
  let body: { password?: string };
  try { body = await request.json() as { password?: string }; } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (typeof body.password !== 'string' || body.password.length > 256 || body.password !== env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Incorrect password.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  const issued = String(Math.floor(Date.now() / 1000));
  const token = `${issued}.${await signature(issued, env.ADMIN_SESSION_SECRET)}`;
  return Response.json({ success: true }, { headers: {
    'Cache-Control': 'no-store',
    'Set-Cookie': `${COOKIE}=${token}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${MAX_AGE}`
  }});
};
