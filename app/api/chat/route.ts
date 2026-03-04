import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Load knowledge base at module level
let knowledgeBase: string;
try {
  knowledgeBase = readFileSync(
    join(process.cwd(), "data", "about-me.md"),
    "utf-8"
  );
} catch {
  knowledgeBase = "";
}

const SYSTEM_PROMPT = `You are Rashi's portfolio assistant — a friendly, concise AI that helps recruiters and visitors learn about Rashi Chaudhary.

Answer questions using ONLY the context below. If someone asks something not covered in the context, say "I don't have that info yet — but you can reach Rashi at rc4809@nyu.edu and she'd love to tell you herself!"

Be warm but professional. Keep answers concise (2-4 sentences unless more detail is asked for). Use bullet points for lists. Don't make up facts.

If someone asks about a specific project, share the relevant case study details. If asked about skills or tools, be specific about proficiency. If asked "why should we hire Rashi" or similar, highlight her unique combination of systems thinking, research-driven design, and technical awareness.

Use markdown formatting in your responses — bold for emphasis, bullet points for lists, and headers if structuring longer answers.

---

${knowledgeBase}`;

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // messages per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Too many messages. Try again later." },
        { status: 429 }
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages required" }, { status: 400 });
    }

    // Only send last 20 messages to keep context manageable
    const recentMessages = messages.slice(-20).map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const stream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: recentMessages,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        stream.on("text", (text) => {
          const data = JSON.stringify({ text });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        });

        stream.on("error", (error) => {
          const data = JSON.stringify({ error: (error as Error).message });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        });

        try {
          await stream.finalMessage();
        } catch {
          // Error already handled by the error event
        }

        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.error("Chat API error:", e);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}