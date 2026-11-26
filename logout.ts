export const onRequestPost: PagesFunction = async () => Response.json({ success: true }, { headers: {
  'Cache-Control': 'no-store',
  'Set-Cookie': 'arena_admin_session=; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
}});
