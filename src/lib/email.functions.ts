import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const EmailInput = z.object({
  type: z.enum([
    "Professional",
    "Follow-up",
    "Sales",
    "HR",
    "Customer Support",
    "Complaint",
    "Thank You",
    "Meeting Request",
  ]),
  tone: z.enum([
    "Professional",
    "Friendly",
    "Formal",
    "Casual",
    "Persuasive",
    "Apologetic",
    "Confident",
  ]),
  recipient: z.string().trim().max(120).optional().default(""),
  subject: z.string().trim().max(160).optional().default(""),
  purpose: z.string().trim().min(3).max(1500),
  notes: z.string().trim().max(1500).optional().default(""),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(apiKey);

    const system = `You are SmartWork AI, an expert email writer. Produce a complete, ready-to-send email.
Rules:
- Output ONLY the email body. No preface, no markdown code fences, no commentary.
- Start with a greeting line (e.g. "Hi {recipient name}," — if no name, use a sensible salutation).
- Include short, scannable paragraphs.
- End with a sign-off line "Best," on its own line followed by "[Your name]" placeholder.
- Match the requested tone precisely.
- Keep it concise: 120-220 words unless the purpose demands more.`;

    const userPrompt = [
      `Email type: ${data.type}`,
      `Tone: ${data.tone}`,
      data.recipient ? `Recipient: ${data.recipient}` : null,
      data.subject ? `Subject line: ${data.subject}` : null,
      `Purpose / what to convey:\n${data.purpose}`,
      data.notes ? `Additional notes:\n${data.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const { text } = await generateText({
        model: gateway("google/gemini-3-flash-preview"),
        system,
        prompt: userPrompt,
      });

      return {
        subject:
          data.subject ||
          `${data.type} — ${data.purpose.slice(0, 60)}${data.purpose.length > 60 ? "…" : ""}`,
        body: text.trim(),
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("429")) {
        throw new Error("Rate limit reached. Please wait a moment and try again.");
      }
      if (msg.includes("402")) {
        throw new Error("AI credits exhausted. Add credits in your Lovable workspace.");
      }
      throw new Error("Couldn't generate email. Please try again.");
    }
  });
