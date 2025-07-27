import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { sampleCategories } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <div className="space-y-2">
              <Link 
                href="/" 
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/prompts" 
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                All Prompts
              </Link>
              <Link 
                href="/categories" 
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                All Categories
              </Link>
              <Link 
                href="/authors" 
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Authors
              </Link>
              <Link 
                href="/prompts/submit" 
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Submit Prompt
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <Link 
              href="/categories"
              className="font-semibold text-gray-900"
            >
              Categories
            </Link>
            <div className="space-y-2 mt-2">
              {sampleCategories.map((category) => (
                <Link 
                  key={category.slug}
                  href={`/categories/${category.slug}`} 
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <div className="space-y-2">
              <Link 
                href="https://github.com/onlyoneaman/awesome-prompts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                Made with ❤️ by
              </div>
              <Link 
                href="https://amankumar.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Aman
                <ExternalLink className="w-3 h-3" />
              </Link>
              <div className="text-xs text-gray-500 mt-4">
                © 2025 Awesome Prompts
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 