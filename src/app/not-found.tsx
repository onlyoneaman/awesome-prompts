import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { links } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Error */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The prompt or page you requested might have been moved, deleted, or doesn&apos;t exist.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg">
              <Link href={links.HOME} className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={links.PROMPT} className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Browse Prompts
              </Link>
            </Button>
          </div>

          {/* Helpful suggestions */}
          <div className="bg-white rounded-lg border p-8">
            <h3 className="text-xl font-semibold mb-4">What can you do instead?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">Explore Popular Prompts</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• <Link href={links.PROMPT} className="hover:text-blue-600">Browse all prompts</Link></li>
                  <li>• <Link href={`${links.CATEGORY}/writing`} className="hover:text-blue-600">Writing prompts</Link></li>
                  <li>• <Link href={`${links.CATEGORY}/programming`} className="hover:text-blue-600">Programming prompts</Link></li>
                  <li>• <Link href={`${links.CATEGORY}/marketing`} className="hover:text-blue-600">Marketing prompts</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contribute</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• <Link href={links.SUBMIT} className="hover:text-blue-600">Submit a new prompt</Link></li>
                  <li>• <Link href={links.GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">View on GitHub</Link></li>
                  <li>• <Link href={`${links.GITHUB}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Contribution Guide</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
