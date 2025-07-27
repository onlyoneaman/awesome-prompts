import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthorBySlug, getAllAuthors } from "@/lib/authors.server";
import { getAllPrompts } from "@/lib/content.server";
import { sortPrompts } from "@/lib/content";
import { PromptCard } from "@/components/prompts/prompt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Globe, Github, Linkedin, Twitter } from "lucide-react";

// Remove edge runtime - use Node.js runtime for filesystem access
// export const runtime = 'edge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  
  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  const allPrompts = getAllPrompts();
  const authorPrompts = allPrompts.filter(prompt => prompt.author === author.slug);

  return {
    title: `${author.name} | AI Prompt Author | Awesome Prompts`,
    description: `${author.bio || `Discover ${authorPrompts.length} AI prompts by ${author.name}`}`,
    keywords: [author.name, "AI prompt author", "prompt engineer", "ChatGPT prompts", "Claude prompts"],
    openGraph: {
      title: `${author.name} - AI Prompt Author`,
      description: author.bio || `${authorPrompts.length} expert AI prompts`,
      type: "profile",
      images: author.profile_picture ? [{ url: author.profile_picture }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${author.name} - AI Prompt Author`,
      description: author.bio || `${authorPrompts.length} expert AI prompts`,
    }
  };
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map(author => ({
    slug: author.slug,
  }));
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const allPrompts = getAllPrompts();
  const authorPrompts = allPrompts.filter(prompt => prompt.author === author.slug);
  const sortedPrompts = sortPrompts(authorPrompts, 'created_at', 'desc');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="link" asChild>
          <Link href="/authors" className="flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Authors
          </Link>
        </Button>
      </div>

      {/* Author Header */}
      <div className="text-center mb-12">
        <div className="mb-6">
          {author.profile_picture ? (
            <img
              src={author.profile_picture}
              alt={author.name}
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
              {author.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{author.name}</h1>
        
        {author.bio && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {author.bio.split('\n')[0]}
          </p>
        )}

        <div className="flex justify-center items-center gap-4 mb-6">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {sortedPrompts.length} {sortedPrompts.length === 1 ? 'Prompt' : 'Prompts'}
          </Badge>

          {/* Social Links */}
          <div className="flex space-x-3">
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
        </div>
      </div>

      {/* Prompts Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Prompts by {author.name}
        </h2>
        
        {sortedPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} referrerAuthor={author.slug} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-4">No prompts yet</h3>
            <p className="text-gray-600 mb-6">
              {author.name} hasn&apos;t published any prompts yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 