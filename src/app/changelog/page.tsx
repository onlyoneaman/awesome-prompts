import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { changelog } from "@/lib/changelog-data";

function getChangeTypeColor(type: string): string {
  switch (type) {
    case "added":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "fixed":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "improved":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "changed":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
}

function getChangeTypeLabel(type: string): string {
  switch (type) {
    case "added":
      return "Added";
    case "fixed":
      return "Fixed";
    case "improved":
      return "Improved";
    case "changed":
      return "Changed";
    default:
      return type;
  }
}

export default function ChangelogPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Button variant="link" asChild className="mb-6">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Changelog</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Track all the latest updates, new features, and improvements to Promptsmint.
          </p>
        </div>

        {/* Changelog Entries */}
        <div className="max-w-4xl space-y-8">
          {changelog.map((entry, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                {entry.version && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    v{entry.version}
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                {entry.changes.map((change, changeIndex) => (
                  <div key={changeIndex} className="flex items-start gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getChangeTypeColor(change.type)}`}>
                      {getChangeTypeLabel(change.type)}
                    </span>
                    <p className="text-gray-700 flex-1">{change.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for Future Updates */}
        {changelog.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600">No changelog entries yet. Check back soon for updates!</p>
          </div>
        )}
      </div>
    </div>
  );
}

