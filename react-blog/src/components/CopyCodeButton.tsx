"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded border border-[#00ff4133] bg-black/50 text-[#4a7c4a] hover:text-[#00ff41] hover:border-[#00ff41] transition-all duration-200 opacity-0 group-hover:opacity-100"
      title="Copy code"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
