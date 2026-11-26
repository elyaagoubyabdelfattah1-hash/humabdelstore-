interface Env { DB: D1Database }
type Input = { asin?: string; name?: string; brand?: string; category?: string; description?: string; highlights?: string[]; image?: string; url?: string };
function parse(value: unknown): string[] { try { const v=JSON.parse(String(value || "[]")); return Array.isArray(v)?v.map(String):[]; } catch { return []; } }
function urlOk(value: string) { if (!value) return true; try { return new URL(value).protocol === "https:"; } catch { return false; } }
export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  let b: Input; try { b=await request.json(); } catch { return Response.json({error:"Invalid product data."},{status:400}); }
  const name=typeof b.name==="string"?b.name.trim():"", category=typeof b.category==="string"?b.category.trim():"";
  const str=(v:unknown)=>typeof v==="string"?v.trim():"";
  const highlights=Array.isArray(b.highlights)?b.highlights.map(v=>String(v).trim()).filter(Boolean).slice(0,10):[];
  const image=str(b.image), url=str(b.url);
  if(!name||!category||!urlOk(image)||!urlOk(url)) return Response.json({error:"Product name, category, and valid HTTPS URLs are required."},{status:400});
  const id=Number(params.id); if(!Number.isInteger(id)||id<1) return Response.json({error:"Invalid product id."},{status:400});
  const result=await env.DB.prepare("UPDATE products SET asin=?,name=?,brand=?,category=?,description=?,highlights_json=?,image=?,url=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(str(b.asin),name,str(b.brand),category,str(b.description),JSON.stringify(highlights),image,url,id).run();
  if(!result.meta.changes) return Response.json({error:"Product not found."},{status:404});
  return Response.json({ok:true});
};
export const onRequestDelete: PagesFunction<Env> = async ({ env, params }) => {
  const id=Number(params.id); if(!Number.isInteger(id)||id<1) return Response.json({error:"Invalid product id."},{status:400});
  const result=await env.DB.prepare("DELETE FROM products WHERE id=?").bind(id).run();
  if(!result.meta.changes) return Response.json({error:"Product not found."},{status:404});
  return Response.json({ok:true});
};
