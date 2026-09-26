import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";

const Input = z.object({
  type: z.enum(["mobile", "web", "games"]),
  lang: z.enum(["ar", "en"]),
  name: z.string().trim().min(1).max(120),
  details: z.string().trim().min(10).max(4000),
  pages: z.number().int().min(1).max(200),
  audience: z.string().trim().max(300),
  features: z.string().trim().max(1500),
  platforms: z.string().trim().max(200),
});

const typeLabel = { mobile: "Mobile application", web: "Website", games: "Interactive / educational game" };

export const estimateProject = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const langName = data.lang === "ar" ? "Arabic" : "English";
    const prompt = `You are the senior project estimator at Smart Techno, a software company.
Analyze this client request and estimate price and delivery time.

Project type: ${typeLabel[data.type]}
Project name: ${data.name}
Number of pages/screens: ${data.pages}
Target platforms: ${data.platforms || "not specified"}
Target audience: ${data.audience || "not specified"}
Key features: ${data.features || "not specified"}
Details: ${data.details}

Rules:
- price must be an integer in US dollars between 100 and 300, based on project size, complexity, value and number of pages.
- days must be a realistic integer number of working days (between 7 and 120).
- complexity is one of: low, medium, high.
- summary: 2-3 sentences analyzing the project. breakdown: 3-6 short bullet points explaining what drives the price/time.
- Write summary and breakdown in ${langName}.`;
    try {
      const result = streamText({
        model: lovable.responses("openai/gpt-6-astra"),
        output: Output.object({
          schema: z.object({
            price: z.number(),
            days: z.number(),
            complexity: z.enum(["low", "medium", "high"]),
            summary: z.string(),
            breakdown: z.array(z.string()),
          }),
        }),
        prompt,
        providerOptions: {
          openai: { forceReasoning: true, reasoningEffort: "low", store: false, include: ["reasoning.encrypted_content"] },
        },
      });
      const o = await result.output;
      return {
        ok: true as const,
        price: Math.round(Math.min(300, Math.max(100, o.price)) / 5) * 5,
        days: Math.round(Math.min(120, Math.max(7, o.days))),
        complexity: o.complexity,
        summary: o.summary,
        breakdown: o.breakdown.slice(0, 6),
      };
    } catch (e) {
      if (NoObjectGeneratedError.isInstance(e)) return { ok: false as const, error: "parse" };
      const status = (e as { statusCode?: number })?.statusCode;
      console.error(e);
      return { ok: false as const, error: status === 402 ? "credits" : status === 429 ? "rate" : "failed" };
    }
  });
