import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { links } from "@/lib/constants";
import { Sparkles, ArrowRight } from "lucide-react";

export function CustomRequestCTA() {
  return (
    <section className="relative z-2 py-9">
      <div className="container mx-auto px-4">
        <Card className="border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 md:p-9">
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Not finding what you're looking for?
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Need a custom AI prompt tailored to your specific needs?
              </p>
              <p className="text-base text-gray-500 mb-8">
                Let's collaborate! Connect with me to create custom prompts for your business, project, or unique use case. 
                Get professional, tested prompts designed specifically for you.
              </p>
              <Button size="lg" asChild className="text-base px-8 py-6">
                <Link href={links.REQUEST_NOW} className="flex items-center gap-2">
                  Get Custom Prompts
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

