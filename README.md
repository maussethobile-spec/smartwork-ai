# SmartWork AI

A modern, responsive, production-ready AI-powered productivity web application. SmartWork AI drafts your emails, summarizes your meetings, and plans your day — all inside a premium, minimalist workspace inspired by Notion, Linear, Vercel, and ChatGPT.

**Current v1 scope:**
- Landing page with bento-grid features, pricing, testimonials, FAQ, and SEO metadata
- AI Email Generator with type/tone controls, live editing, copy, TXT, and PDF export
- Design system with a custom Midnight Indigo theme, glassmorphism, and Tailwind CSS v4

---

## Features

### Landing Page
- Premium hero section with gradient typography and glassmorphism card
- Bento-grid feature showcase (AI Email Generator, Meeting Summarizer, Task Planner, Analytics)
- Capability highlights, testimonials, pricing tiers, and FAQ accordion
- SEO-ready meta tags, Open Graph tags, and responsive layout
- Smooth scrolling and accessible navigation

### AI Email Generator (`/email-generator`)
- Choose from 8 email types: Professional, Follow-up, Sales, HR, Customer Support, Complaint, Thank You, Meeting Request
- Choose from 7 tones: Professional, Friendly, Formal, Casual, Persuasive, Apologetic, Confident
- Optional recipient, subject, and additional notes
- Generated email body preview with inline editing
- One-click Copy, TXT download, and print-to-PDF export
- Regenerate and toast feedback

### Design System
- Custom Midnight Indigo color palette using OKLCH
- Tailwind v4 theme tokens, CSS variables, and `@utility` helpers
- Glassmorphism (`glass`), gradient text (`text-gradient`), and glow shadows
- shadcn/ui components with extended button variants (`hero`, `glass`, `xl`)
- Sora display font + Manrope body font

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 full-stack framework) |
| Router | TanStack Router (file-based routing) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI primitives |
| Animations | Framer Motion ready |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query |
| Server Functions | `createServerFn` from `@tanstack/react-start` |
| AI | Lovable AI Gateway (`ai` SDK + `google/gemini-3-flash-preview`) |
| Fonts | `@fontsource/sora`, `@fontsource/manrope` |
| Icons | Lucide React |
| Toasts | Sonner |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+ with `npm`/`pnpm`
- A Lovable AI API key for AI generation (see Environment Variables)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/smartwork-ai.git
cd smartwork-ai
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your `LOVABLE_API_KEY`.

4. Run the development server:

```bash
bun dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## Environment Variables

Create a `.env` file in the project root with the following variable:

```env
# Required for AI email generation
LOVABLE_API_KEY=your_lovable_api_key_here
```

You can obtain a Lovable API key from your Lovable workspace settings. The AI Email Generator will return a friendly error if the key is missing or credits are exhausted.

---

## Project Structure

```text
smartwork-ai/
├── src/
│   ├── assets/              # Images and static assets
│   ├── components/
│   │   ├── site-chrome.tsx  # Shared header, footer, layout
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/               # Reusable React hooks
│   ├── lib/
│   │   ├── ai-gateway.server.ts   # Lovable AI Gateway provider
│   │   ├── email.functions.ts     # Server function: generate email
│   │   └── utils.ts
│   ├── routes/              # TanStack Start file-based routes
│   │   ├── __root.tsx       # Root layout
│   │   ├── index.tsx        # Landing page ("/")
│   │   └── email-generator.tsx # AI Email Generator ("/email-generator")
│   ├── router.tsx           # Router configuration
│   ├── server.ts            # Server entry configuration
│   ├── start.ts             # Start middleware
│   └── styles.css           # Global theme, Tailwind v4, utilities
├── .env.example
├── .prettierrc
├── bunfig.toml
├── components.json
├── eslint.config.js
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

---

## Available Scripts

| Script | Description |
| --- | --- |
| `bun dev` | Start the Vite development server |
| `bun build` | Build for production |
| `bun build:dev` | Build in development mode |
| `bun preview` | Preview the production build locally |
| `bun lint` | Run ESLint |
| `bun format` | Format all files with Prettier |

---

## Routing Conventions

This project uses TanStack Start file-based routing. Route files live under `src/routes/`:

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `email-generator.tsx` | `/email-generator` |
| `about.tsx` | `/about` |
| `posts.$postId.tsx` | `/posts/:postId` |

`src/routeTree.gen.ts` is auto-generated — do not edit it manually.

---

## AI Integration

The AI Email Generator uses the Lovable AI Gateway with the `ai` SDK. Generation is handled server-side via a `createServerFn` to keep the API key secure.

- Provider: `createLovableAiGatewayProvider`
- Model: `google/gemini-3-flash-preview`
- Output: plain email body with greeting, paragraphs, and sign-off

---

## Deployment

### Lovable / Vercel

This project is configured for deployment on Vercel or the Lovable platform:

1. Push your code to a Git repository.
2. Connect the repository to your deployment platform.
3. Add the `LOVABLE_API_KEY` environment variable in the platform dashboard.
4. Deploy.

### Build Output

TanStack Start produces a static-friendly build suitable for edge/serverless runtimes. The `bun build` command runs Vite in production mode.

---

## Roadmap

- [ ] Authentication and user accounts (Lovable Cloud)
- [ ] AI Meeting Summarizer with file upload
- [ ] AI Task Planner with drag-and-drop prioritization
- [ ] Productivity analytics dashboard
- [ ] Shared team templates
- [ ] DOCX export and email integrations

---

## License

MIT © SmartWork AI
