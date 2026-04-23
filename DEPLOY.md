# 🚀 Deployment Guide — Step by Step

## Prerequisites
- GitHub account (free)
- Vercel account (free) — sign up at vercel.com with your GitHub

---

## STEP 1 — Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `blockchain-exam-prep`
3. Description: `NPTEL Blockchain NOC26_CS34 Complete Exam Prep Kit`
4. Set to **Public** (required for free Vercel deployment)
5. ✅ Do NOT initialize with README (we have our own)
6. Click **Create repository**

---

## STEP 2 — Push Your Files

Open terminal in the `blockchain-exam-prep` folder:

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: NPTEL Blockchain exam prep kit"

# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/blockchain-exam-prep.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## STEP 3 — Deploy to Vercel

### Method A: Dashboard (Easiest)
1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `blockchain-exam-prep` repo
4. Framework Preset: **Other** (auto-detected as static)
5. Root Directory: **./** (leave as is)
6. Click **Deploy**
7. ✅ Done! Vercel gives you a URL like `blockchain-exam-prep.vercel.app`

### Method B: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from repo folder
cd blockchain-exam-prep
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name: blockchain-exam-prep
# - Directory: ./
# - Override settings? No

# For production deployment:
vercel --prod
```

---

## STEP 4 — Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project → **Settings → Domains**
2. Add a domain like `blockchain-prep.yourdomain.com`
3. Follow DNS configuration instructions

OR get a free subdomain: your project automatically gets  
`blockchain-exam-prep-YOUR_VERCEL_USERNAME.vercel.app`

---

## STEP 5 — Automatic Deployments

Every time you push to GitHub, Vercel auto-deploys:
```bash
# Make changes to index.html
git add index.html
git commit -m "Updated exam questions"
git push
# Vercel automatically redeploys in ~30 seconds
```

---

## Alternative: GitHub Pages (100% Free, No Vercel needed)

1. Push to GitHub (Steps 1-2 above)
2. Go to repo **Settings**
3. Scroll to **Pages** section
4. Source: **Deploy from a branch**
5. Branch: **main** | Folder: **/ (root)**
6. Click **Save**
7. Wait 2-3 minutes
8. Your site is live at: `https://YOUR_USERNAME.github.io/blockchain-exam-prep`

---

## Sharing Your Site

Once deployed, share the link with batchmates:
```
Hey! I made an NPTEL Blockchain exam prep kit — 88 questions, 
30 mock test, all 12 weeks covered, topic tracker included.
Check it out: https://blockchain-exam-prep.vercel.app
```

---

## Troubleshooting

**"Page not found" on Vercel?**  
→ Check vercel.json is in root directory and routes are configured

**LocalStorage not working?**  
→ Must be served over HTTP/HTTPS (not file://)  
→ Open via localhost or deployed URL, not double-clicking the HTML file

**Countdown shows wrong time?**  
→ Update the exam instant in `assets/js/app.js`: change the `EXAM_AT` string (ISO local time) to your slot.
