import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { faqs } from "@/lib/faq-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Promptsmint",
  description: "Get answers to common questions about Promptsmint, prompt engineering, AI prompts, and how to use our prompt library.",
  openGraph: {
    title: "FAQs | Promptsmint",
    description: "Get answers to common questions about Promptsmint and prompt engineering.",
    type: "website",
  }
};

export default function FAQPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <Button variant="link" asChild className="mb-6">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            FAQs
          </h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about Promptsmint, prompt engineering, and how to use our prompt library.
          </p>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6"
              >
                <AccordionTrigger className="cursor-pointer text-left md:text-xl font-semibold text-gray-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/prompts/request-now">
                Request Custom Prompt
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://x.com/onlyoneaman" target="_blank" rel="noopener noreferrer">
                Contact Us on X
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

