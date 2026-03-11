# Radiate Signs — Website

Custom neon signs & commercial signage website built with Next.js 14, deployed on Vercel.

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Resend** (email delivery for quote form)
- **Vercel** (free hosting)

## Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, services, stats, CTA |
| `/work` | Portfolio gallery — add your project photos here |
| `/builder` | Interactive neon sign builder |
| `/quote` | Quote request form → emails you via Resend |
| `/api/quote` | API route that handles form submission |

---

## Setup

### 1. Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/radiate-signs-website.git
cd radiate-signs-website
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```
Then edit `.env.local` and add your Resend API key.

**Get Resend free key:**
1. Go to [resend.com](https://resend.com)
2. Create free account (3,000 emails/month free)
3. Create API key
4. Paste it in `.env.local`
5. Verify your domain in Resend (or use their test domain while developing)

**Update your email in `/src/app/api/quote/route.ts`:**
```ts
to: ['hello@radiatesigns.ca'], // ← change this to your actual email
```

### 3. Run locally
```bash
npm run dev
# → http://localhost:3000
```

---

## Adding Your Photos

1. Create `/public/work/` folder
2. Add your project photos named: `project-01.jpg`, `project-02.jpg`, etc.
3. Open `/src/app/work/page.tsx`
4. Update the `projects` array with real titles, categories, and locations
5. Replace `<PlaceholderCard>` with real `<img>` tags:

```tsx
// Replace PlaceholderCard with:
<img 
  src={project.src} 
  alt={project.title}
  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
/>
```

---

## Deploy to Vercel (Free)

### First time:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project" → Import your repo
5. Add environment variable: `RESEND_API_KEY` = your key
6. Click Deploy

### Every future update:
```bash
git add .
git commit -m "your message"
git push
# Vercel auto-deploys in ~30 seconds
```

---

## Customise

### Update contact info
- Footer: `/src/components/Footer.tsx` — update email, phone, WhatsApp link
- Quote page: `/src/app/quote/page.tsx` — update WhatsApp link at bottom
- API route: `/src/app/api/quote/route.ts` — update `to:` email address

### Update brand colors
All colors are CSS variables in `/src/app/globals.css`:
```css
--neon-pink: #ff2d78;
--neon-cyan: #00f5ff;
--neon-orange: #ff6b00;
```

### Add Google Analytics (free)
Add to `/src/app/layout.tsx`:
```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" />
```

---

## Todo Checklist
- [ ] Add real project photos to `/public/work/`
- [ ] Update email in `api/quote/route.ts`
- [ ] Update phone/WhatsApp number in Footer and Quote page
- [ ] Set up Resend account and verify domain
- [ ] Connect custom domain on Vercel
- [ ] Add Google Business Profile link to footer
- [ ] Set up Google Analytics
