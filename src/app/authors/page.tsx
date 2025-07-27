import { Metadata } from "next";
import { getAllAuthors } from "@/lib/authors.server";
import { getAllPrompts } from "@/lib/content.server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Globe, Github, Linkedin, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Authors | Awesome Prompts",
  description: "Meet the talented authors behind our collection of AI prompts. Discover expert prompt engineers and contributors.",
  keywords: ["AI prompt authors", "prompt engineers", "contributors", "experts"],
  openGraph: {
    title: "Authors | Awesome Prompts",
    description: "Meet the experts behind our AI prompt collection",
    type: "website",
  }
};

export default function AuthorsPage() {
  const authors = getAllAuthors();
  const allPrompts = getAllPrompts();

  // Count prompts per author
  const authorPromptCounts = authors.map(author => ({
    ...author,
    promptCount: allPrompts.filter(prompt => prompt.author === author.slug).length
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Meet Our Authors
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Talented prompt engineers and AI experts who contribute to our growing collection of high-quality prompts.
        </p>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authorPromptCounts.map((author) => (
          <Card key={author.slug} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                {author.profile_picture ? (
                  <img
                    src={author.profile_picture}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              
              <CardTitle className="text-lg">{author.name}</CardTitle>
              {author.bio && (
                <CardDescription className="line-clamp-2">
                  {author.bio.split('\n')[0]}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Badge variant="secondary">
                  {author.promptCount} {author.promptCount === 1 ? 'Prompt' : 'Prompts'}
                </Badge>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-3">
                {author.website && (
                  <Link 
                    href={author.website} 
                    target="_blank"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </Link>
                )}
                {author.github && (
                  <Link 
                    href={`https://github.com/${author.github}`} 
                    target="_blank"
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                )}
                {author.twitter && (
                  <Link 
                    href={`https://twitter.com/${author.twitter.replace('@', '')}`} 
                    target="_blank"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                )}
                {author.linkedin && (
                  <Link 
                    href={`https://linkedin.com/in/${author.linkedin}`} 
                    target="_blank"
                    className="text-gray-400 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {/* View Prompts Button */}
              <div className="text-center">
                <Link 
                  href={`/authors/${author.slug}`}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View Prompts →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16 p-8 bg-gray-50 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Want to Become an Author?</h3>
        <p className="text-gray-600 mb-6">
          Share your expertise and help others by contributing high-quality AI prompts to our community.
        </p>
        <Link 
          href="/prompts/submit"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Prompt
        </Link>
      </div>
    </div>
  );
} 