"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { filterPrompts } from "@/lib/content";
import { Prompt } from "@/types/prompt";
import { links } from "@/lib/constants";

interface PromptSearchData {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

interface HeaderSearchProps {
  prompts: PromptSearchData[];
}

export function HeaderSearch({ prompts }: HeaderSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with URL query parameter when on prompts page
  useEffect(() => {
    if (pathname === links.PROMPT) {
      const query = searchParams.get("query") || "";
      setSearchQuery(query);
    } else {
      // Clear search when not on prompts page
      setSearchQuery("");
    }
  }, [searchParams, pathname]);

  // Get suggestions (max 3)
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      return [];
    }
    // Convert to Prompt-like objects for filtering
    const promptObjects: Prompt[] = prompts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      tags: p.tags,
      categories: [],
      created_at: new Date(),
      updated_at: new Date(),
      type: "text",
      actual_text: "",
    }));
    const filtered = filterPrompts(promptObjects, { search: searchQuery.trim() });
    return filtered.slice(0, 3);
  }, [searchQuery, prompts]);

  // Handle search submission
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`${links.PROMPT}?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    } else {
      router.push(links.PROMPT);
      setIsOpen(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    const cleanUrl = `${links.PROMPT}/${slug}`;
    window.location.href = cleanUrl;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={searchRef} className="relative w-full max-w-xs">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search prompts..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-20 h-9 text-sm"
        />
        <Button
          size="sm"
          onClick={handleSearch}
          className="absolute right-1 h-7 w-7 p-0"
          disabled={!searchQuery.trim()}
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((prompt) => (
            <button
              key={prompt.id}
              onClick={(e) => handleSuggestionClick(prompt.slug, e)}
              className="w-full text-left block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900 text-sm">{prompt.title}</div>
              <div className="text-xs text-gray-500 mt-1 line-clamp-1">{prompt.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

