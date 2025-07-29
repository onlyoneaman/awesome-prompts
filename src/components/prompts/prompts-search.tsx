"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { filterPrompts, sortPrompts } from "@/lib/content";
import { PromptCard } from "@/components/prompts/prompt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Prompt } from "@/types/prompt";
import { Input } from "@/components/ui/input";

interface PromptsSearchProps {
  allPrompts: Prompt[];
}

export function PromptsSearch({ allPrompts }: PromptsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);  

  // Filter and sort prompts based on search
  const filteredPrompts = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortPrompts(allPrompts, 'created_at', 'desc');
    }

    const filtered = filterPrompts(allPrompts, { search: searchQuery.trim() });
    return sortPrompts(filtered, 'created_at', 'desc');
  }, [searchQuery, allPrompts]);

  // Get featured prompts (only show when no search)
  const featuredPrompts = useMemo(() => {
    if (searchQuery.trim()) return [];
    const featured = filterPrompts(allPrompts, { featured: true });
    return sortPrompts(featured, 'created_at', 'desc');
  }, [searchQuery, allPrompts]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef])

  return (
    <>
      {/* Header with Search */}
      <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Prompt Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore optimized prompts for a breadth of business and personal tasks.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search prompts by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={inputRef}
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                {filteredPrompts.length} result{filteredPrompts.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </div>

      {/* Featured Prompts - Only show when not searching */}
      {!searchQuery && featuredPrompts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured Prompts</h2>
            <Badge variant="secondary">⭐ Curated Selection</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrompts.slice(0, 6).map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      )}

      {/* All Prompts / Search Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {searchQuery ? 'Search Results' : 'All Prompts'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} 
              {searchQuery ? ' found' : ' available'}
            </span>
            <Link href="/categories">
              <Button variant="outline" size="sm">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>

        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-4">No prompts found</h3>
            <p className="text-gray-600 mb-6">
              Try different keywords or browse our categories to find what you&apos;re looking for.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={clearSearch} variant="outline">
                Clear Search
              </Button>
              <Link href="/categories">
                <Button>Browse Categories</Button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {/* Call to Action - Only show when not searching */}
      {!searchQuery && (
        <div className="text-center mt-16 p-8 bg-white rounded-lg border">
          <h3 className="text-2xl font-semibold mb-4">Have a Great Prompt to Share?</h3>
          <p className="text-gray-600 mb-6">
            Join our community and contribute your best AI prompts to help others achieve better results.
          </p>
          <Button asChild>
            <Link href="/prompts/submit">
              Submit Prompt
            </Link>
          </Button>
        </div>
      )}
    </>
  );
} 