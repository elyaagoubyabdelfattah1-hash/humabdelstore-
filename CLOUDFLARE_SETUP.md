# ARENA — Cloudflare Pages + private admin password

## Included
- Existing storefront and the 48 initial catalogue entries.
- `/admin`: private dashboard to add, edit, search, and delete products.
- `/api/products`: public read-only product catalogue for the storefront.
- `/api/admin/*`: password-protected admin API with a signed, HttpOnly session cookie (12-hour expiry).
- Cloudflare D1 migrations for the product catalogue.

## 1. Install and build
```bash
npm install
npm run build
```

## 2. Create the D1 database
```bash
npx wrangler login
npx wrangler d1 create arena-store-db
```
Copy the database ID returned by Cloudflare into `wrangler.toml`, replacing `REPLACE_WITH_YOUR_D1_DATABASE_ID`, then run:
```bash
npx wrangler d1 migrations apply arena-store-db --remote
```
In the Cloudflare dashboard open **Workers & Pages → your Pages project → Settings → Bindings → Add → D1 database**. Set the variable name to `DB` and select `arena-store-db`. Save and redeploy after adding the binding.

## 3. Set the administrator secrets in Cloudflare (no Zero Trust subscription)
Open **Workers & Pages → your Pages project → Settings → Variables and Secrets**. Add these as **Secrets**, for both Production (and Preview only if you intend to test admin access on preview deployments):

- `ADMIN_PASSWORD` — choose a long, unique password. This is the password you will type at `https://YOUR_HOSTNAME/admin`.
- `ADMIN_SESSION_SECRET` — generate a separate random secret, at least 32 characters. Do not reuse the admin password.

Save the settings and redeploy the Pages project so the Functions receive the secrets. Do not put either secret in source code, `wrangler.toml`, GitHub, or a public variable. The admin API rejects requests until both secrets exist.

## 4. Deploy
For a Git-connected Pages project, push the project to its repository and use build command `npm run build` and output directory `dist`. With Wrangler:
```bash
npx wrangler pages deploy dist --project-name YOUR_PAGES_PROJECT_NAME
```

## 5. Sign in and manage products
Visit `https://YOUR_HOSTNAME/admin`, enter the `ADMIN_PASSWORD` secret, and use the dashboard to add, edit, search, and delete products. The login session is stored in an HttpOnly, Secure, SameSite=Strict cookie and expires after 12 hours. The public store reads products from `/api/products`; that endpoint remains public and read-only.

The package does not log in to or change your Cloudflare account. You must create the D1 database, add the binding and secrets, and deploy from your Cloudflare account. Do not share your secrets with anyone.
