"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ACCENT = "#EAB0FF";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hey! I'm Rashi's AI assistant. Ask me anything about her work, experience, skills, or projects.";

const PROMPTS = [
  "How I redesign high-friction funnels",
  "How I design within real constraints",
  "How I make multi-brand UX consistent",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Only auto-focus on desktop — mobile keyboard is annoying on open
  useEffect(() => {
    if (open && inputRef.current && window.innerWidth >= 1024) {
      inputRef.current.focus();
    }
  }, [open]);

  const showPrompts = messages.length === 1 && !streaming;

  async function sendText(text: string) {
    if (!text || streaming) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setStreaming(true);

    // Add empty assistant message that will be filled progressively
    const withAssistant = [...updated, { role: "assistant" as const, content: "" }];
    setMessages(withAssistant);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Split on double newline (SSE event boundary)
        const events = buffer.split("\n\n");
        buffer = events.pop() || ""; // Keep incomplete event for next chunk

        for (const event of events) {
          const line = event.trim();
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              accumulated += parsed.text;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: accumulated };
                return next;
              });
            }
            if (parsed.error) {
              throw new Error(parsed.error);
            }
          } catch (parseErr) {
            if (parseErr instanceof SyntaxError) continue;
            throw parseErr;
          }
        }
      }
    } catch (error) {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content:
            error instanceof Error && error.message.includes("Too many")
              ? error.message
              : "Something went wrong. Please try again.",
        };
        return next;
      });
      console.error("Chat error:", error);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      {/* Chat bubble — sits above scroll-to-top button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-none shadow-lg"
        style={{ backgroundColor: open ? "#000" : ACCENT }}
        whileHover={{
          scale: 1.1,
          boxShadow: `0 0 24px ${open ? "rgba(0,0,0,0.3)" : "rgba(234,176,255,0.4)"}`,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M4 4L14 14M14 4L4 14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                stroke="black"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-40 right-4 left-4 sm:left-auto sm:right-8 z-50 sm:w-[360px] max-h-[480px] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e8e8e8",
              fontFamily: "'Geist', sans-serif",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3 border-b"
              style={{ borderColor: "#e8e8e8" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ backgroundColor: ACCENT, color: "#000" }}
              >
                R
              </div>
              <div>
                <p className="text-sm font-semibold text-black leading-tight">
                  Ask Rashi&apos;s AI
                </p>
                <p className="text-xs text-black/40 leading-tight">
                  Portfolio assistant
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3"
              style={{ minHeight: 200, maxHeight: 320 }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-[1.55] rounded-2xl ${
                    msg.role === "user"
                      ? "self-end text-white"
                      : "self-start text-black"
                  }`}
                  style={{
                    backgroundColor:
                      msg.role === "user" ? "#000" : "#f5f5f5",
                    borderBottomRightRadius:
                      msg.role === "user" ? 4 : undefined,
                    borderBottomLeftRadius:
                      msg.role === "assistant" ? 4 : undefined,
                    wordBreak: "break-word",
                  }}
                >
                  {msg.role === "assistant" ? (
                    <div className="chat-markdown prose prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content || "\u200B"}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
                  )}
                </div>
              ))}
              {showPrompts && (
                <div className="flex flex-col gap-2 mt-1">
                  {PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendText(prompt)}
                      className="self-start text-[12px] leading-[1.4] px-3 py-1.5 rounded-full border cursor-pointer transition-colors text-left"
                      style={{
                        borderColor: "#e8e8e8",
                        backgroundColor: "#fff",
                        color: "#000",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                        e.currentTarget.style.borderColor = "#000";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff";
                        e.currentTarget.style.borderColor = "#e8e8e8";
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
              {streaming && messages[messages.length - 1]?.content === "" && (
                <div
                  className="self-start px-3.5 py-2.5 rounded-2xl text-[13px] text-black/40"
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderBottomLeftRadius: 4,
                  }}
                >
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                  </span>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 border-t flex items-center gap-2"
              style={{ borderColor: "#e8e8e8" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendText(input.trim())}
                placeholder="Ask about Rashi..."
                className="flex-1 text-[16px] sm:text-[13px] bg-transparent outline-none text-black placeholder:text-black/30"
                disabled={streaming}
              />
              <button
                onClick={() => sendText(input.trim())}
                disabled={streaming || !input.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors"
                style={{
                  backgroundColor:
                    input.trim() && !streaming ? "#000" : "#e8e8e8",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7H13M13 7L7 1M13 7L7 13"
                    stroke={input.trim() && !streaming ? "white" : "#999"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact markdown styles for chat bubble */}
      <style jsx global>{`
        .chat-markdown p { margin: 0 0 0.4em; }
        .chat-markdown p:last-child { margin-bottom: 0; }
        .chat-markdown ul, .chat-markdown ol { margin: 0.3em 0; padding-left: 1.2em; }
        .chat-markdown li { margin: 0.1em 0; }
        .chat-markdown strong { font-weight: 600; }
        .chat-markdown code:not(pre code) {
          background: rgba(0,0,0,0.06);
          padding: 0.1em 0.3em;
          border-radius: 3px;
          font-size: 0.85em;
        }
        .chat-markdown pre {
          background: rgba(0,0,0,0.06);
          padding: 0.5em;
          border-radius: 6px;
          overflow-x: auto;
          font-size: 0.8em;
          margin: 0.4em 0;
        }
        .chat-markdown h1, .chat-markdown h2, .chat-markdown h3 {
          font-size: 0.9em;
          font-weight: 600;
          margin: 0.5em 0 0.2em;
        }
        .chat-markdown a { color: #7c3aed; text-decoration: underline; }
        .chat-markdown blockquote {
          border-left: 2px solid #ddd;
          padding-left: 0.6em;
          margin: 0.3em 0;
          color: rgba(0,0,0,0.6);
        }
      `}</style>
    </>
  );
}