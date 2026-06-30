# SmartWork AI

A modern, AI-powered productivity web application. Built with **TanStack Start**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. It uses **Lovable Cloud** for authentication, database, and storage, and **Lovable AI Gateway** for OpenAI-compatible AI features.

> **Scope note:** This repository currently includes the landing page + design system and the **AI Smart Email Generator** as the first shipped feature. The remaining features (meeting summarizer, task planner, dashboard, analytics, profile, settings) are staged for upcoming releases and documented in the roadmap below.

---

## ✨ Features

- **Premium landing page** — hero, features, AI capabilities, testimonials, pricing, FAQ, contact, footer
- **AI Email Generator** — 8 email types, 7 tones, recipient/subject/purpose/notes inputs, generate, edit, copy, regenerate, TXT and PDF export
- **Dark, glassmorphic UI** — Midnight Indigo design system, rounded cards, subtle gradients, soft shadows, responsive typography
- **Production-ready architecture** — typed server functions, input validation, error handling, AI-gateway rate-limit/credit handling

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start v1 (React 19 + Vite) |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| AI | Lovable AI Gateway via `@ai-sdk/openai-compatible` + `ai` |
| Auth / DB / Storage | Lovable Cloud (Supabase) |
| Validation | Zod |
| Forms | React Hook Form |
| Icons | Lucide React |

---

## 📁 Project Structure

```text
src/
  assets/                  # Static images (hero, icons, etc.)
  components/
    site-chrome.tsx        # Shared header and footer
    ui/                    # shadcn/ui components
  lib/
    ai-gateway.server.ts   # Lovable AI Gateway provider helper
    email.functions.ts     # Server function: generate email
  routes/
    __root.tsx             # Root layout (head, providers, shell)
    index.tsx              # Landing page
    email-generator.tsx    # AI Email Generator feature
  styles.css               # Design system tokens, fonts, utilities
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (recommended package manager)
- A Lovable account with the project connected to Lovable Cloud
- `LOVABLE_API_KEY` configured for the project (Lovable provisions this automatically)

### 1. Clone the project

```bash
git clone <repository-url>
cd smartwork-ai
```

### 2. Install dependencies

```bash
bun install
```

### 3. Run the development server

```bash
bun dev
```

Open [http://localhost:8080](http://localhost:8080) to view the app.

---

## 🔐 Environment Variables

This project uses **Lovable-managed secrets** for the backend and AI services. You do **not** need to add a `.env` file for these — Lovable injects them at runtime. If you are running locally outside Lovable, you can create a `.env` file for compatibility:

```env
# Lovable Cloud / Supabase
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Lovable AI Gateway
LOVABLE_API_KEY=
```

> ⚠️ Never commit secrets or API keys to the repository. The production app reads `LOVABLE_API_KEY` inside server functions only.

---

## 🧪 Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| Dev server | `bun dev` | Start Vite dev server at `http://localhost:8080` |
| Build | `bun build` | Production build |
| Build dev | `bun build:dev` | Development build |
| Preview | `bun preview` | Preview production build locally |
| Lint | `bun lint` | Run ESLint |
| Format | `bun format` | Run Prettier |

---

## 🧱 Roadmap

The following features are planned for upcoming releases:

- [ ] Authentication — sign up, login, forgot password, email verification, Google sign-in
- [ ] Protected dashboard — welcome, productivity score, tasks, AI activity, stats, calendar
- [ ] AI Meeting Notes Summarizer — paste/upload DOCX/PDF/TXT, structured output, export
- [ ] AI Task Planner — create, prioritize, schedule, Kanban/calendar/timeline views, drag-and-drop
- [ ] Notifications — due reminders, overdue alerts, daily/weekly summaries, browser push
- [ ] Analytics — productivity score, completed/pending tasks, weekly/monthly performance, AI usage, time saved
- [ ] User profile & settings — avatar, password, theme, notifications, language, AI preferences
- [ ] SEO & sitemap polish, OG images, structured data

---

## 🎨 Design System

The visual identity uses **Midnight Indigo** with a dark-first glassmorphism aesthetic:

- **Display font:** Sora
- **Body font:** Manrope
- **Primary accent:** Electric indigo/purple gradient
- **Surfaces:** Deep navy cards with translucent backgrounds
- **Effects:** Backdrop blur, soft glows, subtle gradients

All tokens live in `src/styles.css`.

---

## 🌐 Deployment

This project is ready to deploy on **Lovable**. To publish:

1. Click the **Publish** button in the Lovable editor
2. Choose a `.lovable.app` subdomain or add a custom domain
3. Frontend changes require clicking **Update** in the publish dialog to go live
4. Backend changes (server functions, database, auth) deploy automatically

For self-hosting, see the [Lovable self-hosting guide](https://docs.lovable.dev/tips-tricks/self-hosting).

---

## 📄 License

This project is private and owned by the creator. License terms are determined by the project owner.

---

Built with ❤️ using Lovable.
