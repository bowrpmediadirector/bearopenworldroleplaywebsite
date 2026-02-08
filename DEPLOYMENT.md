# Vercel Deployment Checklist (for this static site)

If your `*.vercel.app` URL shows **404: NOT_FOUND**, verify these settings in Vercel Project Settings:

1. **Framework Preset**: `Other`
2. **Root Directory**: repository root (leave default unless your files are in a subfolder)
3. **Build Command**: empty
4. **Output Directory**: empty
5. **Install Command**: empty (optional)
6. Redeploy the **latest commit** on the production branch.

This repository serves static HTML files directly (e.g. `index.html`, `admin.html`, etc.), and uses `vercel.json` routes to map clean URLs.

## Quick URL checks after deploy
- `/`
- `/departments`
- `/staff`
- `/announcements`
- `/events`
- `/calendar`
- `/guidelines`
- `/admin`
