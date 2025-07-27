import Link from "next/link";
import { Github, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - OS info */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Open Source project by</span>
              <Link 
                href="https://amankumar.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700"
              >
                Aman Kumar
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for the AI community</span>
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-6">
            <Link 
              href="https://github.com/onlyoneaman/awesome-prompts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm font-medium">Star on GitHub</span>
            </Link>
            
            <Link 
              href="/prompts" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Browse Prompts
            </Link>
            
            <Link 
              href="/prompts/submit" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contribute
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>
            © 2024 Awesome Prompts. Licensed under MIT License. 
            <Link 
              href="https://github.com/onlyoneaman/awesome-prompts/blob/main/LICENSE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 underline hover:text-gray-700"
            >
              View License
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
} 