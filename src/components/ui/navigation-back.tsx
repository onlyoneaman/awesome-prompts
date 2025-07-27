"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getNavigationContext } from "@/lib/utils";
import { getCategoryBySlug } from "@/lib/content";

interface NavigationBackProps {
  currentPromptCategories: string[];
  className?: string;
}

export function NavigationBack({ currentPromptCategories, className }: NavigationBackProps) {
  const [backUrl, setBackUrl] = useState("/prompts");
  const [backLabel, setBackLabel] = useState("Back to Prompts");

  useEffect(() => {
    // Get referrer from document
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
  }, [currentPromptCategories]);

  return (
    <Button variant="ghost" asChild className={className}>
      <Link href={backUrl} className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>
    </Button>
  );
} 