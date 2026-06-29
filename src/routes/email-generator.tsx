import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  Copy,
  Download,
  Loader2,
  RefreshCw,
  Sparkles,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-chrome";
import { generateEmail } from "@/lib/email.functions";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "AI Email Generator — SmartWork AI" },
      {
        name: "description",
        content:
          "Generate professional emails in seconds. Choose type, tone, and purpose — SmartWork AI does the rest.",
      },
      { property: "og:title", content: "AI Email Generator — SmartWork AI" },
      {
        property: "og:description",
        content: "Generate professional emails in seconds with SmartWork AI.",
      },
    ],
  }),
  component: EmailGeneratorPage,
});

const TYPES = [
  "Professional",
  "Follow-up",
  "Sales",
  "HR",
  "Customer Support",
  "Complaint",
  "Thank You",
  "Meeting Request",
] as const;

const TONES = [
  "Professional",
  "Friendly",
  "Formal",
  "Casual",
  "Persuasive",
  "Apologetic",
  "Confident",
] as const;

function EmailGeneratorPage() {
  const generateFn = useServerFn(generateEmail);

  const [type, setType] = useState<(typeof TYPES)[number]>("Professional");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Professional");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [notes, setNotes] = useState("");

  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState("");
  const [finalSubject, setFinalSubject] = useState("");
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: (input: {
      type: (typeof TYPES)[number];
      tone: (typeof TONES)[number];
      recipient: string;
      subject: string;
      purpose: string;
      notes: string;
    }) => generateFn({ data: input }),
    onSuccess: (res) => {
      setBody(res.body);
      setFinalSubject(res.subject);
      setEditing(false);
      toast.success("Email generated");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  function handleGenerate() {
    if (purpose.trim().length < 3) {
      toast.error("Tell the AI what the email is about.");
      return;
    }
    mutation.mutate({ type, tone, recipient, subject, purpose, notes });
  }

  async function handleCopy() {
    const text = `Subject: ${finalSubject}\n\n${body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownloadTxt() {
    const text = `Subject: ${finalSubject}\n\n${body}`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `email-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handlePrintPdf() {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>${finalSubject}</title>
      <style>body{font-family:-apple-system,system-ui,sans-serif;max-width:680px;margin:48px auto;padding:0 24px;line-height:1.6;color:#111}h1{font-size:18px;margin-bottom:24px}pre{white-space:pre-wrap;font-family:inherit;font-size:14px}</style>
      </head><body><h1>${finalSubject}</h1><pre>${body.replace(/</g, "&lt;")}</pre></body></html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 250);
  }

  const hasOutput = body.length > 0;

  return (
    <div className="min-h-screen px-4 pb-16">
      <SiteHeader />
      <Toaster richColors theme="dark" position="top-right" />

      <div className="mx-auto mt-10 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" /> AI Email Generator
            </div>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Draft the perfect email{" "}
              <span className="text-gradient">in seconds</span>.
            </h1>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* INPUT PANEL */}
          <div className="rounded-2xl glass p-6 lg:col-span-2">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Email type">
                  <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Tone">
                  <Select value={tone} onValueChange={(v) => setTone(v as typeof tone)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Recipient (optional)">
                <Input
                  placeholder="e.g. Sarah Patel, Head of Design"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  maxLength={120}
                />
              </Field>
              <Field label="Subject (optional)">
                <Input
                  placeholder="e.g. Quick check-in on the Q4 launch"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={160}
                />
              </Field>
              <Field label="Purpose / what to say">
                <Textarea
                  placeholder="Briefly explain what you want this email to accomplish…"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  maxLength={1500}
                  rows={4}
                />
              </Field>
              <Field label="Additional notes (optional)">
                <Textarea
                  placeholder="Anything else the AI should know — context, constraints, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={1500}
                  rows={3}
                />
              </Field>

              <Button
                onClick={handleGenerate}
                variant="hero"
                size="lg"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <><Loader2 className="animate-spin" /> Generating…</>
                ) : (
                  <><Sparkles /> {hasOutput ? "Regenerate" : "Generate email"}</>
                )}
              </Button>
            </div>
          </div>

          {/* OUTPUT PANEL */}
          <div className="rounded-2xl glass p-6 lg:col-span-3">
            {!hasOutput && !mutation.isPending && (
              <EmptyState />
            )}

            {mutation.isPending && <SkeletonOutput />}

            {hasOutput && !mutation.isPending && (
              <div className="flex h-full flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Subject
                    </div>
                    {editing ? (
                      <Input
                        value={finalSubject}
                        onChange={(e) => setFinalSubject(e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 truncate font-display text-lg font-medium">
                        {finalSubject}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditing((v) => !v)}>
                      {editing ? "Done" : "Edit"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadTxt}>
                      <Download /> TXT
                    </Button>
                    <Button variant="outline" size="sm" onClick={handlePrintPdf}>
                      <Download /> PDF
                    </Button>
                    <Button variant="hero" size="sm" onClick={handleGenerate}>
                      <RefreshCw /> Regenerate
                    </Button>
                  </div>
                </div>
                <div className="mt-5 flex-1">
                  {editing ? (
                    <Textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className="min-h-[420px] font-mono text-sm leading-relaxed"
                    />
                  ) : (
                    <div className="min-h-[420px] whitespace-pre-wrap rounded-xl border border-border bg-background/40 p-5 text-sm leading-relaxed text-foreground/90">
                      {body}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="grid h-full min-h-[420px] place-items-center text-center">
      <div className="max-w-xs">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-hero-gradient shadow-glow">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold">Your email will appear here</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Fill in the form on the left, hit Generate, and SmartWork AI will draft a polished email
          ready to send.
        </p>
      </div>
    </div>
  );
}

function SkeletonOutput() {
  return (
    <div className="space-y-3">
      <div className="h-5 w-2/3 animate-pulse rounded bg-muted/60" />
      <div className="h-3 w-full animate-pulse rounded bg-muted/40" />
      <div className="h-3 w-11/12 animate-pulse rounded bg-muted/40" />
      <div className="h-3 w-10/12 animate-pulse rounded bg-muted/40" />
      <div className="h-3 w-9/12 animate-pulse rounded bg-muted/40" />
      <div className="mt-6 h-3 w-full animate-pulse rounded bg-muted/40" />
      <div className="h-3 w-11/12 animate-pulse rounded bg-muted/40" />
      <div className="h-3 w-8/12 animate-pulse rounded bg-muted/40" />
    </div>
  );
}
