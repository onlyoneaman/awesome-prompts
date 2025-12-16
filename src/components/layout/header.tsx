"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { topCategories } from "@/lib/prompts";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl md:text-2xl font-bold text-gray-900 truncate">
              PromptsMint
            </div>
          </Link>

          {/* Actions - Desktop Navigation + Submit */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Home
              </Link>
              
              <Link 
                href="/prompts" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Prompts
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/categories"
                      className="flex items-center gap-2 w-full font-medium"
                    >
                      <span>📂</span>
                      <span>Browse All</span>
                    </Link>
                  </DropdownMenuItem>
                  <div className="border-t my-1"></div>
                  {topCategories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link 
                        href={`/categories/${category.slug}`}
                        className="flex items-center gap-2 w-full"
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/prompts/submit">Submit Prompt</Link>
            </Button> */}
                      
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* <Button 
                className="w-fit"
                variant="outline" 
                size="sm" 
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/prompts/submit">Submit</Link>
              </Button> */}
              
              <Link 
                href="/prompts" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Prompts
              </Link>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <Link 
                  href="/categories"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📂 Browse All Categories
                </Link>
                
                <div className="pl-4 space-y-2 border-l-2 border-gray-100">
                  {topCategories.map((category) => (
                    <Link 
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 