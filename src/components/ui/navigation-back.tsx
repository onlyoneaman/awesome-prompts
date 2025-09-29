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
    // Read URL parameters on client side
    const urlParams = new URLSearchParams(window.location.search);
    const urlReferrerCategory = urlParams.get('referrer_category');
    const urlReferrerAuthor = urlParams.get('referrer_author');

    // If referrerAuthor is provided via URL parameter (props or URL), prioritize it
    const finalReferrerAuthor = referrerAuthor || urlReferrerAuthor;
    if (finalReferrerAuthor) {
      const author = getAuthorBySlug(finalReferrerAuthor);
      if (author) {
        setBackUrl(`/authors/${finalReferrerAuthor}`);
        setBackLabel(`Back to ${author.name}`);
        return;
      }
    }

    // If referrerCategory is provided via URL parameter (props or URL), prioritize it
    const finalReferrerCategory = referrerCategory || urlReferrerCategory;
    if (finalReferrerCategory) {
      const category = getCategoryBySlug(finalReferrerCategory);
      if (category) {
        setBackUrl(`/categories/${finalReferrerCategory}`);
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
    <Button variant="link" asChild className={`hover:underline ${className}`}>
      <Link href={backUrl} className="flex items-center gap-2 px-4 py-2">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm md:text-base">{backLabel}</span>
      </Link>
    </Button>
  );
} 