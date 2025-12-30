import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, Twitter } from "lucide-react";
import { topCategories } from "@/lib/prompts";
import { links } from "@/lib/constants";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: links.PROMPT, label: "All Prompts" },
  { href: links.CATEGORY, label: "All Categories" },
  { href: links.AUTHOR, label: "Authors" },
  { href: links.SUBMIT, label: "Submit Prompt" },
];

const resourceLinks = [
  // {
  //   href: links.GITHUB,
  //   label: "GitHub",
  //   icon: Github,
  //   external: true,
  // },
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
        <div className="grid grid-cols-3 gap-5 md:gap-8">
          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="block text-sm text-gray-600 hover:underline hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <Link 
              href={links.CATEGORY}
              className="font-semibold text-gray-900"
            >
              Categories
            </Link>
            <div className="space-y-1 md:space-y-2 mt-2">
              {topCategories.map((category) => (
                <Link 
                  key={category.slug}
                  href={`${links.CATEGORY}/${category.slug}`} 
                  className="flex items-center gap-2 text-sm text-gray-600 hover:underline hover:text-gray-900 transition-colors"
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
                    className="flex items-center gap-2 text-sm text-gray-600 hover:underline hover:text-gray-900 transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                    {resource.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-6 flex flex-col items-center gap-1">
          <div className="text-xs text-gray-500">
            © 2025 Promptsmint
          </div>
          <p className="text-xs text-gray-500">
            Made with ❤️ by <Link href="https://amankumar.ai" target="_blank" rel="noopener noreferrer" className="hover:underline">Aman</Link>
          </p>
          <div className="text-xs text-gray-500">
            <Link href="https://x.com/onlyoneaman?ref=promptsmint.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              x.com
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
} 