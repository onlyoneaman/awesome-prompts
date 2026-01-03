"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import posthog from "posthog-js";

interface CopyButtonProps {
  text: string;
  variant?: "outline" | "ghost" | "default";
  size?: "xs" | "sm" | "default" | "lg";
  className?: string;
  title?: string;
}

export function CopyButton({ text, variant = "outline", size = "sm", className, title }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Prompt copied to clipboard');
      posthog.capture('prompt_copy_to_clipboard', {
        text: text,
        title: title,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      aria-label="Copy Prompt"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 md:w-4 md:h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3 h-3 md:w-4 md:h-4" />
          Copy
        </>
      )}
    </Button>
  );
} 