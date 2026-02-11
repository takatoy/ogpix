# ogpix Launch Copy

Ready-to-post texts for launching ogpix. Customize the URL once deployed.

---

## Show HN (Hacker News)

**Title:** Show HN: ogpix – Generate dynamic OG images with a simple GET request

**Text:**
Hi HN, I built ogpix, a simple API for generating Open Graph images dynamically.

The problem: Every page on your site needs a unique og:image for social sharing, but creating them manually doesn't scale. Self-hosting image generation with Puppeteer or Satori adds infrastructure complexity.

ogpix makes it a single GET request:

    GET https://ogpix.dev/api/og?template=blog&title=My+Post&author=Jane&key=YOUR_KEY

Returns a 1200x630 PNG. Four templates (blog, product, social, minimal), dark/light themes, customizable via URL params.

Free tier: 100 images/month. Pro: $9/mo for 5,000. Business: $29/mo unlimited.

Built with Next.js, @vercel/og (Satori), and Stripe. Try it without signing up at the playground: https://ogpix.dev/playground

Would love feedback on the templates and API design.

---

## Product Hunt

**Tagline:** Beautiful OG images with one API call

**Description:**
ogpix generates dynamic Open Graph images via a simple REST API.

🎨 4 professional templates (blog, product, social, minimal)
🌗 Dark and light themes
⚡ One GET request = one PNG image (1200x630)
🔑 API key authentication with usage tracking
💰 Free tier: 100 images/month

No design tools needed. No infrastructure to maintain. Just add a meta tag with your ogpix URL and every page gets a unique, branded preview when shared on social media.

**Maker comment:**
I built ogpix because I was tired of either having no OG images or spending time creating them manually in Figma for every blog post.

The API is dead simple - it's just a GET request with your content as query parameters. You can try all templates live in the playground without creating an account.

---

## Reddit r/webdev

**Title:** I built a free API for generating dynamic OG images - try it without signing up

**Text:**
Hey r/webdev,

I built **ogpix** - an API that generates Open Graph images from URL parameters. Instead of creating OG images manually in Figma or setting up Puppeteer/Satori yourself, you just make a GET request:

```
https://ogpix.dev/api/og?template=blog&title=My+Post&author=Jane
```

And you get back a 1200x630 PNG.

**Features:**
- 4 templates: blog, product, social, minimal
- Dark/light themes
- Free: 100 images/month (no credit card)
- Pro: $9/mo for 5,000 images
- Try it live: https://ogpix.dev/playground

Built with Next.js and @vercel/og. Would love your feedback on the templates and what other features would be useful.

---

## Reddit r/SaaS and r/indiehackers

**Title:** Launched my first micro-SaaS: ogpix - dynamic OG image generation API ($0-29/mo)

**Text:**
Just launched **ogpix**, a simple API for generating Open Graph images dynamically.

**The problem:** Every page on your website needs a unique og:image for social media previews, but creating them manually doesn't scale.

**The solution:** A GET request that returns a PNG:
```
/api/og?template=blog&title=My+Post&author=Jane
```

**Pricing:**
- Free: 100 images/month
- Pro: $9/mo - 5,000 images
- Business: $29/mo - unlimited

**Tech stack:** Next.js, TypeScript, Prisma, Stripe, @vercel/og, deployed on Vercel.

**What I learned building it:**
- The code is maybe 5% of the work. Distribution is everything.
- Keeping the product dead simple (one GET request) makes it easy to explain.
- Free tier is essential for an API product - developers want to try before buying.

Happy to answer questions about the tech or business side.

---

## Twitter/X Thread

**Tweet 1:**
I just launched ogpix - generate beautiful OG images with one API call.

GET /api/og?template=blog&title=My+Post&author=Jane

→ Returns a 1200x630 PNG

Free tier: 100 images/month. Try it now: https://ogpix.dev/playground

**Tweet 2:**
Why I built this:

Every blog post, product page, and docs page needs an og:image for social sharing.

Creating them manually? Doesn't scale.
Self-hosting Puppeteer? Infrastructure headache.

ogpix: one URL = one image. Zero infra.

**Tweet 3:**
4 templates included:

📝 Blog - title, author, date, gradient bg
📦 Product - centered name + tagline
🌈 Social - bold text, avatar, colorful
⬛ Minimal - clean monochrome

All customizable via URL params. Dark & light themes.

**Tweet 4:**
Tech stack for the curious:

- Next.js 16 (App Router)
- @vercel/og (Satori) for image gen
- Prisma + SQLite
- Stripe for payments
- Deployed on Vercel

Built the entire thing in a day.

**Tweet 5:**
Try it free:

🎮 Playground (no signup): https://ogpix.dev/playground
📖 API docs: https://ogpix.dev/docs
💰 Pricing: https://ogpix.dev/pricing

100 free images/month. No credit card needed.
