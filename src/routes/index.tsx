import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Mail,
  FileText,
  ListChecks,
  Sparkles,
  Brain,
  Clock,
  Shield,
  Check,
  Zap,
  BarChart3,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import heroOrb from "@/assets/hero-orb.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartWork AI — AI productivity for modern teams" },
      {
        name: "description",
        content:
          "SmartWork AI writes your emails, summarizes meetings, and plans your day. Premium AI productivity for modern teams.",
      },
      { property: "og:title", content: "SmartWork AI — AI productivity for modern teams" },
      {
        property: "og:description",
        content:
          "Write emails, summarize meetings, and plan tasks with AI. A premium productivity workspace.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: Mail,
    title: "AI Email Generator",
    desc: "Eight email types, seven tones. Draft, refine, and ship in seconds.",
    span: "md:col-span-2",
  },
  {
    icon: FileText,
    title: "Meeting Summarizer",
    desc: "Paste or upload notes — get summary, decisions, action items.",
  },
  {
    icon: ListChecks,
    title: "AI Task Planner",
    desc: "Auto-prioritize, schedule, and break down projects.",
  },
  {
    icon: BarChart3,
    title: "Productivity analytics",
    desc: "Track time saved, focus hours, and weekly trends.",
    span: "md:col-span-2",
  },
];

const capabilities = [
  { icon: Brain, title: "Frontier models", desc: "Gemini, GPT-class quality routed through Lovable AI." },
  { icon: Zap, title: "Lightning fast", desc: "Streaming generations, sub-second feedback." },
  { icon: Workflow, title: "Fits your workflow", desc: "Designed to live next to your inbox and calendar." },
  { icon: Shield, title: "Secure by default", desc: "Auth, RLS, encrypted storage out of the box." },
  { icon: Clock, title: "Saves real hours", desc: "Teams report 6+ hours saved per week per person." },
  { icon: Sparkles, title: "Beautifully simple", desc: "Premium UI. No bloat, no learning curve." },
];

const testimonials = [
  {
    quote: "I rewrote our entire weekly comms loop around SmartWork. It's the first AI tool my team actually uses daily.",
    name: "Maya Chen",
    role: "Head of Ops, Northwind",
  },
  {
    quote: "Meeting summaries that I'd actually send to my CEO. Genuinely indistinguishable from a great human EA.",
    name: "Daniel Ortega",
    role: "Founder, Lumen Labs",
  },
  {
    quote: "Cut my inbox time in half in the first week. The tone control is incredible.",
    name: "Priya Raman",
    role: "Account Director, Foldwork",
  },
];

const pricing = [
  {
    name: "Free",
    price: "$0",
    tagline: "For getting a feel of it.",
    features: ["50 AI generations / month", "Email + meeting tools", "Single workspace"],
    cta: "Start free",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$19",
    tagline: "For individuals who ship a lot.",
    features: ["Unlimited generations", "All AI features", "Priority models", "Export to PDF/DOCX"],
    cta: "Go Pro",
    variant: "hero" as const,
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    tagline: "Per seat, for teams.",
    features: ["Everything in Pro", "Team workspaces", "Shared templates", "SSO + audit log"],
    cta: "Talk to us",
    variant: "outline" as const,
  },
];

const faqs = [
  {
    q: "Do I need an OpenAI API key?",
    a: "No. SmartWork AI is powered by the Lovable AI Gateway — you get frontier-model quality without managing any provider keys.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your content is processed only to generate your output. Nothing is used to train models. Authentication and database access use row-level security by default.",
  },
  {
    q: "Can I export my generations?",
    a: "Yes — copy, download as TXT, or export to PDF. DOCX export is available on Pro.",
  },
  {
    q: "Does it work on mobile?",
    a: "Completely. SmartWork AI is mobile-first and works beautifully on any device.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen px-4 pb-1">
      <SiteHeader />

      {/* HERO */}
      <section className="mx-auto mt-16 grid max-w-6xl items-center gap-12 md:mt-24 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            New — AI Email Generator is live
          </div>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Your second brain,{" "}
            <span className="text-gradient">writing every email</span> you'd
            rather not.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            SmartWork AI drafts your emails, summarizes your meetings, and plans
            your day — so you spend hours on what matters, not on your inbox.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/email-generator">
                Try the Email Generator <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#features">See features</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-accent" /> Free to start</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-accent" /> No credit card</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-accent" /> Cancel anytime</span>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-hero-gradient opacity-30 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border glass">
              <img
                src={heroOrb}
                alt="Glowing neural network mesh"
                width={1280}
                height={1280}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP-LITE */}
      <p className="mx-auto mt-20 max-w-6xl text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Trusted by operators at fast-moving teams
      </p>

      {/* FEATURES BENTO */}
      <section id="features" className="mx-auto mt-12 max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you need.{" "}
            <span className="text-gradient">Nothing you don't.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A focused AI workspace built around the work you actually do every day.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className={`group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-0.5 hover:shadow-glow ${f.span ?? ""}`}
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="mx-auto mt-32 max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Built on <span className="text-gradient">frontier AI</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Premium models, premium speed, premium UX — without the API headaches.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40">
              <c.icon className="h-5 w-5 text-accent" />
              <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto mt-32 max-w-6xl">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Loved by people who <span className="text-gradient">ship</span>
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl glass p-6">
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-hero-gradient font-display text-xs font-semibold text-primary-foreground">
                  {t.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <span>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto mt-32 max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple, <span className="text-gradient">honest pricing</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pricing.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-7 ${
                p.highlight
                  ? "glass shadow-glow ring-1 ring-primary/40"
                  : "border border-border bg-card/40"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-hero-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                  Most popular
                </span>
              )}
              <div className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                {p.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">{p.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.variant} className="mt-7 w-full" size="lg">
                <Link to="/email-generator">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto mt-32 max-w-3xl">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Questions, <span className="text-gradient">answered</span>
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-base font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="mx-auto mt-32 max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl glass p-10 text-center md:p-16">
          <div className="absolute inset-0 -z-10 opacity-40 bg-hero-gradient blur-3xl" />
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Get hours back, <span className="text-gradient">starting today</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Try the AI Email Generator now — no signup required to play with it.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/email-generator">
                Try it now <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="mailto:hello@smartwork.ai">Contact sales</a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
