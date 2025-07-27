"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getNavigationContext } from "@/lib/utils";
import { getCategoryBySlug } from "@/lib/prompts";

interface NavigationBackProps {
  currentPromptCategories: string[];
  className?: string;
  referrerCategory?: string;
}

export function NavigationBack({ currentPromptCategories, className, referrerCategory }: NavigationBackProps) {
  const [backUrl, setBackUrl] = useState("/prompts");
  const [backLabel, setBackLabel] = useState("Back to Prompts");

  useEffect(() => {
    // If referrerCategory is provided via URL parameter, prioritize it
    if (referrerCategory) {
      const category = getCategoryBySlug(referrerCategory);
      if (category) {
        setBackUrl(`/categories/${referrerCategory}`);
        setBackLabel(`Back to ${category.name}`);
        return;
      }
    }

    // Fallback to original referrer-based logic
    const referrer = document.referrer;
    const context = getNavigationContext(referrer);
    
    if (context.type === 'category' && context.category) {
      const category = getCategoryBySlug(context.category);
      if (category) {
        setBackUrl(`/categories/${context.category}`);
        setBackLabel(`Back to ${category.name}`);
      }
    } else if (context.type === 'prompts') {
      setBackUrl("/prompts");
      setBackLabel("Back to All Prompts");
    } else if (context.type === 'home') {
      setBackUrl("/");
      setBackLabel("Back to Home");
    } else if (context.type === 'categories') {
      setBackUrl("/categories");
      setBackLabel("Back to Categories");
    } else {
      // Default to prompts listing for direct access
      setBackUrl("/prompts");
      setBackLabel("Back to All Prompts");
    }
  }, [currentPromptCategories, referrerCategory]);

  return (
    <Button variant="ghost" asChild className={className}>
      <Link href={backUrl} className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>
    </Button>
  );
} 