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

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const url = new URL(request.url);
  if (url.pathname === '/api/admin/login') return next();
  if (!env.ADMIN_SESSION_SECRET) return Response.json({ error: 'Admin authentication is not configured.' }, { status: 503 });
  const cookies = request.headers.get('Cookie') || '';
  const token = cookies.split(';').map(v => v.trim()).find(v => v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (token) {
    const [issued, supplied] = token.split('.');
    const timestamp = Number(issued);
    if (Number.isInteger(timestamp) && supplied && Date.now() / 1000 - timestamp >= 0 && Date.now() / 1000 - timestamp < MAX_AGE) {
      const expected = await signature(issued, env.ADMIN_SESSION_SECRET);
      if (supplied.length === expected.length) {
        const a = encoder.encode(supplied), b = encoder.encode(expected);
        let mismatch = 0;
        for (let i = 0; i < a.length; i++) mismatch |= a[i] ^ b[i];
        if (mismatch === 0) return next();
      }
    }
  }
  return Response.json({ error: 'Please sign in to manage the store.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
};
