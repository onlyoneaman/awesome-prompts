import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { topCategories } from "@/lib/prompts";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/prompts", label: "All Prompts" },
  { href: "/categories", label: "All Categories" },
  { href: "/authors", label: "Authors" },
  { href: "/prompts/submit", label: "Submit Prompt" },
];

const resourceLinks = [
  {
    href: "https://github.com/onlyoneaman/awesome-prompts",
    label: "GitHub",
    icon: Github,
    external: true,
  },
  {
    href: "https://platform.openai.com/docs/examples",
    label: "OpenAI Prompt Examples",
    icon: ExternalLink,
    external: true,
  },
  {
    href: "https://docs.anthropic.com/en/resources/prompt-library/library",
    label: "Anthropic Prompt Library",
    icon: ExternalLink,
    external: true,
  },
  {
    href: "https://ai.google.dev/gemini-api/prompts",
    label: "Gemini Prompt Gallery",
    icon: ExternalLink,
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
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
              {topCategories.map((category) => (
                <Link 
                  key={category.slug}
                  href={`/categories/${category.slug}`} 
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {category.icon?.startsWith('/') ? (
                    <Image 
                      src={category.icon} 
                      alt={category.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-cover rounded-full"
                    />
                  ) : (
                    <span>{category.icon}</span>
                  )}
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <div className="space-y-2">
              {resourceLinks.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <Link 
                    key={resource.href}
                    href={resource.href} 
                    target={resource.external ? "_blank" : undefined}
                    rel={resource.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                    {resource.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>Made with ❤️ by</span>
                <Link
                  href="https://amankumar.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:underline items-center gap-1 font-medium"
                >
                  Aman
                  <ExternalLink size={12} />
                </Link>
              </div>
              <div className="text-xs text-gray-500">
                <Link
                  href="https://x.com/onlyoneaman?ref=promptsmint.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:underline items-center gap-1 font-medium"
                >
                  x.com
                </Link>
              </div>
              <div className="text-xs text-gray-500">
                © 2025 Awesome Prompts
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 