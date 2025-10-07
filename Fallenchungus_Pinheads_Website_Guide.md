# 🧠 Fallenchungus Pinheads — The Meme That Outlasted the Market

## Overview
This document defines the content and structure for the **official website** of **Fallenchungus Pinheads ($PINHEADS)** — a meme coin on **Solana** inspired by the legend of the one meme that never sent.

The site should blend **clean, minimalist design** with **absurdist meme energy** — think *Apple.com meets MS Paint prophecy.*

---

## 🎨 Design Guidelines

- **Theme:** MS Paint meets futuristic minimalism.  
- **Color Palette:**  
  - Background: `#0a0a0a` (black)  
  - Accent: `#ff00ff` (neon magenta)  
  - Secondary: `#00ffff` (aqua/cyan)  
  - Text: white / off-white  
- **Typography:**  
  - Headings: Bold sans-serif (Orbitron, Inter, or Anton)  
  - Body: Clean sans-serif (Inter, Open Sans, or Roboto)  
- **Mood:** Cultish but self-aware. Sharp contrasts, glowing edges, subtle animation.  
- **Optional Effects:**  
  - Floating “pinheads” in background (SVG or GIF loop)  
  - Hover glow on buttons  
  - Slight MS-Paint stroke effect on key meme images  

---

## 🧩 Page Structure

### 1️⃣ Landing Page
**Sections:**
- **Hero Section**
  - Title: `Fallenchungus Pinheads`
  - Subtitle: `The meme that never sent.`
  - Background image: one of the main Fallenchungus artworks (from the gallery)
  - Call-to-Action buttons:
    - `Buy on Pump.fun` → link to Pump.fun page  
    - `View on Dexscreener` → [Dexscreener link placeholder]  
    - `Join X Community` → [X link placeholder]
- **Ticker Banner:** `$PINHEADS` — glowing scrolling text  
- **Lore Teaser:** short scrollable text or animated MS Paint prophecy quote.

---

### 2️⃣ The Lore
**Section Title:** *The Meme That Outlasted the Market*

**Content (formatted in story style):**

> Every 100M+ coin on Pumpfun has already had its run —  
> $Pnut, $Goat, $Fwog, $UFD, $Michi, $Troll, $PFP … all mooners and honored by Pumpfun via the app.  
>  
> But one face never left the Pumpfun landing page.  
> Unmoved. Unbonded.  
> The meme that outlasted the market.  
>  
> **Fallenchungus.**  
> The MS Paint prophet of 2023.  
> The only meme on Pumpfun’s front page that never sent.  
>  
> **$PINHEADS — time to join the 100M gang.**

---

### 3️⃣ The Legend Continues
Add another section for the new lore:

> When the real **Bigchungus** — 60k-follower legend — blessed the token and dropped the contract address,  
> the prophecy deepened.  
>  
> He joined the community.  
> Then deleted his X account.  
>  
> The cult was born.  
>  
> The **Pinheads** rose — profile pictures changed, memes evolved, and the prophecy spread.  
>  
> The community CTO’d the token.  
> The fallen prophet became the eternal meme.

Include stylized quote boxes or MS Paint-style doodles.

---

### 4️⃣ Gallery
- Display a **grid** or **carousel** of the Fallenchungus images.  
- Each image can be clicked to enlarge (lightbox view).  
- Optionally add “MS Paint” frame borders or glowing outlines.  
- Allow captions like: “The Prophet”, “Unbonded”, “The Cult Awakens”, etc.

---

### 5️⃣ Join the Cult
**Simple call-to-action section:**
> The prophet has fallen.  
> The cult has risen.  
> Become one of the **Pinheads**.

Buttons:
- **Buy on Pump.fun**  
- **View on Dexscreener**  
- **Join the X Community**

Optional:
- Animated counter of token holders or cult members (using Solana API).  

---

## 🔗 External Links
- **Dexscreener:** `[https://dexscreener.com/solana/your-token-address-here](https://dexscreener.com/solana/your-token-address-here)`  
- **X (Twitter) Community:** `[https://x.com/yourcommunityhandle](https://x.com/yourcommunityhandle)`  
- **Pump.fun Launch:** `[https://pump.fun/your-token-address-here](https://pump.fun/your-token-address-here)`

---

## 📁 Gallery Folder
The developer should include a `/gallery` folder in the project root containing the following:
```
/gallery
  |- prophet.png
  |- cult.png
  |- frontpage.png
  |- paintstyle.png
  |- awakening.gif
```

The site should auto-generate the gallery grid dynamically from that folder.

---

## 🧱 Tech Stack Recommendations

- **Frontend:** React or Next.js  
- **Styling:** TailwindCSS or Styled-Components  
- **Hosting:** Vercel / Netlify  
- **Animation:** Framer Motion or GSAP  
- **Optional Integrations:**  
  - Solana wallet connect (Phantom) for minting or token stats  
  - Live Dexscreener data widget  
  - On-chain holder counter  
