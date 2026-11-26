export const onRequestPost: PagesFunction = async () => new Response(null, {
  status: 204,
  headers: { "Set-Cookie": "arena_admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/api/admin; Max-Age=0", "Cache-Control": "no-store" }
});
