"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import Link from "next/link";
import { Info, Github, FileText } from "lucide-react";
import { sampleCategories } from "@/lib/prompts";
import { generatePromptSlug } from "@/lib/prompts";

export default function SubmitPromptPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    actual_text: "",
    categories: [] as string[],
    tags: "",
    difficulty_level: "beginner" as "beginner" | "intermediate" | "advanced",
    use_case: "",
    author: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (categorySlug: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categorySlug)
        ? prev.categories.filter(c => c !== categorySlug)
        : [...prev.categories, categorySlug]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create the prompt object
      const promptData = {
        ...formData,
        id: `prompt-${Date.now()}`,
        slug: generatePromptSlug(formData.title),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        created_at: new Date(),
        updated_at: new Date(),
        likes: 0,
        views: 0
      };

      // Here you would normally send to your API
      console.log('Prompt submitted:', promptData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <Layout>
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">✅ Prompt Submitted Successfully!</CardTitle>
                  <CardDescription>
                    Thank you for contributing to our community. Your prompt will be reviewed and added to our collection soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 justify-center">
                    <Button asChild>
                      <Link href="/prompts">Browse Prompts</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/prompts/submit">Submit Another</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Share Your Prompt
              </h1>
              <p className="text-xl text-gray-600">
                Contribute to the open source community by sharing your best AI prompts.
              </p>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Submit via Form
                  </CardTitle>
                  <CardDescription>
                    Quick and easy submission through our web form. We&apos;ll review and add it to the repository.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Continue with Form</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    Create Pull Request
                  </CardTitle>
                  <CardDescription>
                    Contribute directly to the GitHub repository. Perfect for developers who want full control.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link 
                      href="https://github.com/onlyoneaman/awesome-prompts/blob/main/CONTRIBUTING.md" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Contribution Guide
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Prompt</CardTitle>
                <CardDescription>
                  Fill out the form below to share your prompt with the community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                      Prompt Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Marketing Copy Generator"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of what this prompt does and how it helps users..."
                    />
                  </div>

                  {/* Actual Prompt Text */}
                  <div>
                    <label htmlFor="actual_text" className="block text-sm font-medium mb-2">
                      Prompt Text *
                    </label>
                    <textarea
                      id="actual_text"
                      name="actual_text"
                      value={formData.actual_text}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="Enter your prompt text here. Use [BRACKETS] for user-replaceable variables..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Use [BRACKETS] for placeholders that users should replace (e.g., [TOPIC], [AUDIENCE], [TONE])
                    </p>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Categories * (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {sampleCategories.map((category) => (
                        <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.categories.includes(category.slug)}
                            onChange={() => handleCategoryChange(category.slug)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm flex items-center gap-1">
                            <span>{category.icon}</span>
                            {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., copywriting, email, sales, conversion (comma-separated)"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Separate multiple tags with commas
                    </p>
                  </div>

                  {/* Difficulty Level */}
                  <div>
                    <label htmlFor="difficulty_level" className="block text-sm font-medium mb-2">
                      Difficulty Level
                    </label>
                    <select
                      id="difficulty_level"
                      name="difficulty_level"
                      value={formData.difficulty_level}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        difficulty_level: e.target.value as "beginner" | "intermediate" | "advanced"
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  {/* Use Case */}
                  <div>
                    <label htmlFor="use_case" className="block text-sm font-medium mb-2">
                      Use Case
                    </label>
                    <input
                      type="text"
                      id="use_case"
                      name="use_case"
                      value={formData.use_case}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Creating compelling email subject lines for marketing campaigns"
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-2">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name for attribution"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !formData.title || !formData.description || !formData.actual_text || formData.categories.length === 0}
                      className="w-full"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Prompt"}
                    </Button>
                  </div>
                </form>

                {submitStatus === "error" && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">
                      There was an error submitting your prompt. Please try again.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Submission Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Quality Standards</h4>
                    <ul className="space-y-1">
                      <li>• Clear and specific instructions</li>
                      <li>• Tested with major AI models</li>
                      <li>• Original or significantly improved</li>
                      <li>• Properly formatted and structured</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Popular Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {sampleCategories.slice(0, 4).map((category) => (
                        <div key={category.id} className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span className="text-sm">{category.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
} 