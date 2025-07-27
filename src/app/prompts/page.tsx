import { Metadata } from "next";
import { getAllPrompts } from "@/lib/content.server";
import { PromptsSearch } from "@/components/prompts/prompts-search";

export const metadata: Metadata = {
  title: "Browse AI Prompts | Awesome Prompts Library",
  description: "Discover our curated collection of AI prompts for writing, programming, marketing, and more. Perfect for ChatGPT, Claude, and other AI tools.",
  keywords: ["AI prompts", "ChatGPT prompts", "Claude prompts", "writing prompts", "programming prompts", "marketing prompts"],
  openGraph: {
    title: "Browse AI Prompts | Awesome Prompts",
    description: "Explore our collection of AI prompts for various use cases and industries.",
    type: "website",
  }
};

export default function PromptsPage() {
  // Get all prompts from MD files on the server
  const allPrompts = getAllPrompts();

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PromptsSearch allPrompts={allPrompts} />
      </div>
    </div>
  );
} 