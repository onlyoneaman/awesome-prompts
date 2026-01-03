import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Promptsmint",
  description: "Read Promptsmint's Terms of Service. Understand the terms and conditions for using our AI prompt library.",
  openGraph: {
    title: "Terms of Service | Promptsmint",
    description: "Terms and conditions for using Promptsmint.",
    type: "website",
  }
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-gray-600">
            Last updated: January 3, 2026
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Promptsmint ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                Promptsmint is an open-source, curated collection of AI prompts designed to help users get better results from AI tools like ChatGPT, Claude, Gemini, and other language models. The Service provides access to prompts, search functionality, categories, and community-contributed content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use License</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Permission is granted to temporarily access and use Promptsmint for personal, commercial, or educational purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Modify or copy the materials for commercial redistribution without attribution</li>
                <li>Use the materials for any illegal purpose or in violation of any laws</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Contributions</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                By submitting prompts or content to Promptsmint, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and distribute your contributions. You represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You own or have the right to submit the content</li>
                <li>Your content does not infringe on any third-party rights</li>
                <li>Your content is not illegal, harmful, or violates any laws</li>
                <li>Your content does not contain malware, viruses, or harmful code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The Service and its original content, features, and functionality are owned by Promptsmint and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. Prompts contributed by users remain available under open-source licenses as specified.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                The materials on Promptsmint are provided on an 'as is' basis. Promptsmint makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property</li>
                <li>Any guarantee that prompts will produce desired results with AI tools</li>
                <li>Accuracy, likely results, or reliability of the use of the materials on the Service</li>
                <li>Any errors or omissions in the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitations of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall Promptsmint or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Promptsmint, even if Promptsmint or a Promptsmint authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. AI-Generated Content</h2>
              <p className="text-gray-700 leading-relaxed">
                Prompts on Promptsmint are designed to be used with AI tools. We do not control or guarantee the outputs generated by AI tools when using our prompts. Users are responsible for reviewing, editing, and verifying any AI-generated content before use. Promptsmint is not responsible for any consequences resulting from AI-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You may not use the Service:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:hello@promptsmint.com" className="text-blue-600 hover:text-blue-800 underline">
                  hello@promptsmint.com
                </a>
                {" "}or visit our{" "}
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                  contact page
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

