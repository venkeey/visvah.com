# visweb — Vis Web Monorepo

All web projects for [visvah.com](https://visvah.com) live here.

## Structure

```
visweb/
├── lib/          ← Flutter landing page  (visvah.com/)
├── web/
├── pubspec.yaml
└── knu/          ← React Tokenomics Book (visvah.com/knu/)
    ├── src/
    ├── public/
    └── package.json
```

## Server Info

| | Value |
|---|---|
| Host | `visvah.com` |
| SSH user | `developer` |
| Landing root | `/var/www/visvah/` |
| Book root | `/var/www/visknu/` |

---

## Landing Page (Flutter)

### Dev
```bash
flutter run -d chrome
```

### Deploy
```bash
flutter build web --release
scp -r build/web/* developer@visvah.com:/var/www/visvah/
```

---

## Tokenomics Book (React — `knu/`)

### Dev
```bash
cd knu
npm install
npm start
```

### Deploy
```bash
cd knu
npm run build
scp -r build/* developer@visvah.com:/var/www/visknu/
```

> SSH key required. In WSL:
> ```bash
> cp /mnt/c/Users/Lenovo/.ssh/id_ed25519 /tmp/visvah_key && chmod 600 /tmp/visvah_key
> scp -i /tmp/visvah_key -r knu/build/* developer@visvah.com:/var/www/visknu/
> ```
