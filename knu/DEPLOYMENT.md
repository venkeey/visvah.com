# Deployment Guide - Tokenomics Book React

## Current Hosting

**Live URL:** `https://visvah.com/knu/`
**Server:** `51.15.143.147` (Hetzner)
**Web root:** `/var/www/visknu/`
**Served by:** nginx (subpath of visvah.com, same SSL cert)

The `homepage` field in `package.json` is set to `/knu/` — all asset paths are prefixed accordingly.

---

## Deploying Updates

### 1. Build

```bash
cd tokenomics-book-react
npm run build
```

### 2. Upload to server

```bash
scp -i ~/.ssh/id_ed25519 -r build/. developer@51.15.143.147:/var/www/visknu/
```

Nginx picks up the new files immediately — no restart needed.

> **SSH note:** Use `~/.ssh/id_ed25519` (comment: "login"). The default developer key is restricted to tmux only.

---

## Nginx Config (on server)

The following block lives inside the `visvah.com` HTTPS server block at `/etc/nginx/sites-enabled/visvah`:

```nginx
location /knu/ {
    alias /var/www/visknu/;
    try_files $uri $uri/ /knu/index.html;
    index index.html;
}
```

`try_files` ensures SPA client-side routing works on direct URL access/reload.

---

## Local Development

```bash
cd tokenomics-book-react
npm install
npm start
```

Opens at `http://localhost:3000`. Note: in dev mode the app runs at root `/`, not `/knu/` — the `homepage` setting only affects the production build.

---

## Troubleshooting

**Blank white screen after deploy:**
- Check nginx `/knu/` location block is present: `sudo nginx -t`
- Verify files uploaded: `ls /var/www/visknu/`
- Check browser console for JS errors

**SPA routes 404 on reload:**
- Ensure `try_files $uri $uri/ /knu/index.html` is in the nginx block

**Build fails:**
- Node 16+ required
- `npm cache clean --force` then retry
