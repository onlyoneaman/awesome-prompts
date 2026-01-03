import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompts/prompt-card";
import { links } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { getAllPrompts } from "@/lib/content.server";
import { sortPrompts } from "@/lib/prompts";

export function PopularPrompts() {
  // Get a few prompts for homepage preview
  const allPrompts = getAllPrompts();
  const sortedPrompts = sortPrompts(allPrompts, 'created_at', 'desc');
  const previewPrompts = sortedPrompts.slice(0, 6);

  return (
    <section className="relative z-2 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Prompts</h2>
          <Button variant="outline" asChild>
            <Link href={links.PROMPT} className="flex items-center gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </section>
  );
}

