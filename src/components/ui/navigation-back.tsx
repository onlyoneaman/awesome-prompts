"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getNavigationContext } from "@/lib/utils";
import { getCategoryBySlug, getAuthorBySlug } from "@/lib/prompts";

interface NavigationBackProps {
  currentPromptCategories: string[];
  className?: string;
  referrerCategory?: string;
  referrerAuthor?: string;
}

export function NavigationBack({ currentPromptCategories, className, referrerCategory, referrerAuthor }: NavigationBackProps) {
  const [backUrl, setBackUrl] = useState("/prompts");
  const [backLabel, setBackLabel] = useState("Back to Prompts");

  useEffect(() => {
    // If referrerAuthor is provided via URL parameter, prioritize it
    if (referrerAuthor) {
      const author = getAuthorBySlug(referrerAuthor);
      if (author) {
        setBackUrl(`/authors/${referrerAuthor}`);
        setBackLabel(`Back to ${author.name}`);
        return;
      }
    }

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
    
    if (context.type === 'author' && context.author) {
      const author = getAuthorBySlug(context.author);
      if (author) {
        setBackUrl(`/authors/${context.author}`);
        setBackLabel(`Back to ${author.name}`);
      }
    } else if (context.type === 'category' && context.category) {
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
    } else if (context.type === 'authors') {
      setBackUrl("/authors");
      setBackLabel("Back to Authors");
    } else {
      // Default to prompts listing for direct access
      setBackUrl("/prompts");
      setBackLabel("Back to All Prompts");
    }
  }, [currentPromptCategories, referrerCategory, referrerAuthor]);

  return (
    <Button variant="ghost" asChild className={`hover:bg-gray-100 ${className}`}>
      <Link href={backUrl} className="flex items-center gap-2 px-4 py-2">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm md:text-base">{backLabel}</span>
      </Link>
    </Button>
  );
} 