import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { topCategories } from "@/lib/prompts";
import { Search } from "lucide-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { links } from "@/lib/constants";
import { PopularPrompts } from "@/components/prompts/popular-prompts";

export default function Home() {
  return (
      <div className="bg-gray-50 min-h-screen relative antialiased">
        {/* Hero Section */}
        <section className="relative z-2 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">
              <PointerHighlight containerClassName="inline-block">
                Prompt
              </PointerHighlight>
              &nbsp;Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore optimized prompts for a breadth of business and personal tasks.
            </p>
            
            <div className="max-w-2xl mx-auto mb-12">
              <Link href={links.PROMPT}>
                <div className="relative cursor-pointer">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 focus:border-transparent cursor-pointer"
                    readOnly
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Prompts Preview */}
        <PopularPrompts />

        {/* Categories Section */}
        <section className="relative z-2 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by Category</h2>
              <p className="text-gray-600">
                Find prompts organized by specific use cases and domains
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topCategories.map((category) => (
                <Link key={category.id} href={`${links.CATEGORY}/${category.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2 flex items-center justify-center">
                        {category.icon?.startsWith('/') ? (
                          <Image 
                            src={category.icon} 
                            alt={category.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover rounded-full"
                          />
                        ) : (
                          category.icon
                        )}
                      </div>
                      <h3 className="font-medium mb-1 text-gray-900">{category.name}</h3>
                      <p className="text-xs text-gray-500">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BackgroundBeams className="z-1" />
      </div>
  );
}
