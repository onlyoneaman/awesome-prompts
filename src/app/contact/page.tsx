import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Promptsmint",
  description: "Get in touch with Promptsmint. Contact us via email or message Aman (founder) on X.",
  openGraph: {
    title: "Contact | Promptsmint",
    description: "Get in touch with Promptsmint team.",
    type: "website",
  }
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
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
            Contact Us
          </h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Please make sure you've read our{" "}
            <Link href="/faq" className="text-blue-600 hover:text-blue-800 underline font-medium">
              FAQs
            </Link>{" "}
            first to ensure your question hasn't already been answered.
          </p>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            If you are unable to find the answer you're looking for on our{" "}
            <Link href="/faq" className="text-blue-600 hover:text-blue-800 underline font-medium">
              FAQs
            </Link>
            , or have any other enquiries, please reach out to us via the channels below:
          </p>
        </div>

        {/* Contact Options */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center">
            <a 
              href="mailto:hello@promptsmint.com"
              className="text-lg md:text-xl text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              hello@promptsmint.com
            </a>
          </div>
          <div className="text-center">
            <Link 
              href="https://x.com/onlyoneaman" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg md:text-xl text-gray-700 hover:text-gray-900 hover:underline inline-flex items-center gap-2"
            >
              <Twitter className="w-5 h-5" />
              Message Aman (founder) on X
            </Link>
          </div>
        </div>

        {/* Response Time Note */}
        <div className="mt-12 text-center">
          <p className="text-sm md:text-base text-gray-600">
            We aim to respond to all enquiries within 24 hours ⚡️
          </p>
        </div>
      </div>
    </div>
  );
}

