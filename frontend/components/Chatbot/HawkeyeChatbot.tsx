'use client';

import { useEffect, useMemo, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const stripMarkdown = (text: string) =>
  text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");

const renderMessageContent = (rawContent: string) => {
  const content = stripMarkdown(rawContent);
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (!blocks.length) {
    return <p className="mb-2 text-sm leading-relaxed">{content}</p>;
  }

  return blocks.map((block, blockIndex) => {
    const lines = block.split("\n").map((line) => line.trim());
    const isList = lines.every((line) => /^[-•*]/.test(line));

    if (isList) {
      return (
        <ul key={`list-${blockIndex}`} className="mb-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {lines.map((line, lineIndex) => (
            <li key={`list-${blockIndex}-${lineIndex}`}>
              {line.replace(/^[-•*]\s*/, "")}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={`para-${blockIndex}`} className="mb-2 text-sm leading-relaxed">
        {block}
      </p>
    );
  });
};

const SYSTEM_PROMPT =
  "You are Hawkeye, a proactive financial co-pilot. Provide concise, actionable guidance on financial fraud trends, risk mitigation, compliance, and growth finance. Cite real-world best practices when relevant and be explicit about assumptions. If unsure, be transparent.";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const MAX_RETRIES = 2;
const RETRY_BASE_DELAY = 800;

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export function HawkeyeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Hi, I’m Hawkeye. Ask me anything about financial fraud, compliance, or scaling healthy business finances.",
      },
    ]);
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const canSend = useMemo(() => {
    return !!userInput.trim() && !isLoading;
  }, [userInput, isLoading]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setError(null);
  };

  const sendMessage = async () => {
    if (!canSend) return;

    if (!apiKey) {
      setError("Missing Gemini API key. Please set NEXT_PUBLIC_GEMINI_API_KEY.");
      return;
    }

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userInput.trim(),
    };

    const nextMessages = [...messages, newMessage];
    setMessages(nextMessages);
    setUserInput("");
    setIsLoading(true);
    setError(null);

    const requestBody = JSON.stringify({
      system_instruction: {
        role: "system",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: nextMessages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })),
      generation_config: {
        temperature: 0.35,
        top_p: 0.95,
      },
    });

    try {
      const fetchWithRetry = async () => {
        for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
          const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: requestBody,
          });

          const data = await response.json();

          if (response.ok) {
            return data;
          }

          const apiMessage =
            data?.error?.message || "Unable to reach Hawkeye right now.";
          const normalized = apiMessage.toLowerCase();
          const overloaded =
            response.status === 503 ||
            normalized.includes("overloaded") ||
            normalized.includes("please try again later");

          if (overloaded && attempt < MAX_RETRIES) {
            await sleep(RETRY_BASE_DELAY * (attempt + 1));
            continue;
          }

          throw new Error(apiMessage);
        }

        throw new Error("Unable to reach Hawkeye right now.");
      };

      const data = await fetchWithRetry();

      const output =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "I’m still gathering insights. Could you try asking again?";

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: output },
      ]);
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      if (message.toLowerCase().includes("overloaded")) {
        setError(
          "Hawkeye is handling a surge in questions. Please retry in a few seconds."
        );
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        aria-label="Open Hawkeye chatbot"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#6f42c1] text-white shadow-lg shadow-purple-300 transition hover:bg-[#5a32a3]"
        onClick={handleToggle}
      >
        <span className="text-sm font-semibold">H</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-end bg-black/20 backdrop-blur-sm">
          <div className="m-6 flex h-[520px] w-full max-w-md flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between rounded-t-3xl bg-[#6f42c1] px-5 py-4 text-white">
              <div>
                <p className="text-sm uppercase tracking-wide text-white/80">
                  Hawkeye
                </p>
                <h2 className="text-lg font-semibold">Financial Copilot</h2>
              </div>
              <button
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/30"
                onClick={handleToggle}
              >
                Close
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-5 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow ${
                      message.role === "user"
                        ? "bg-[#6f42c1] text-white"
                        : "bg-white text-slate-800"
                    }`}
                  >
                    {renderMessageContent(message.content)}
                  </div>
                </div>
              ))}

              {error && (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-white px-5 py-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-[#6f42c1]">
                <input
                  value={userInput}
                  onChange={(event) => setUserInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask about fraud trends, controls, or financial strategy..."
                  className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <button
                  className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition ${
                    canSend
                      ? "bg-[#6f42c1] hover:bg-[#5a32a3]"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                  onClick={sendMessage}
                  disabled={!canSend}
                >
                  {isLoading ? "Thinking..." : "Send"}
                </button>
              </div>
              {!apiKey && (
                <p className="mt-2 text-xs text-red-500">
                  Add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file to talk
                  with Hawkeye.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

