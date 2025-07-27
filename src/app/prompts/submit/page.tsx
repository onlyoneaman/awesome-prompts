"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Info, Github, ChevronDown } from "lucide-react";
import { sampleCategories, generatePromptSlug } from "@/lib/prompts";

export default function SubmitPromptPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    actual_text: "",
    categories: [] as string[],
    tags: "",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    use_cases: "",
    author: "",
    author_website: "",
    author_email: "",
    author_phone: "",
    author_twitter: "",
    author_github: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    const submitEndpoint = process.env.NEXT_PUBLIC_SUBMIT_ENDPOINT;
    if (!submitEndpoint) {
      toast.error("Submit endpoint not configured. Please set NEXT_PUBLIC_SUBMIT_ENDPOINT environment variable.");
      return;
    }

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

      // API call to log the event
      await axios.post(submitEndpoint, {
        event: "prompt_submission",
        duration: 0,
        request_data: promptData,
        response_data: {},
        user_id: ""
      });

      console.log('Prompt submitted successfully:', promptData);
      toast.success("Prompt submitted successfully! We'll review it and get back to you within 2 business days.");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        actual_text: "",
        categories: [],
        tags: "",
        difficulty: "beginner",
        use_cases: "",
        author: "",
        author_website: "",
        author_email: "",
        author_phone: "",
        author_twitter: "",
        author_github: ""
      });
    } catch (error) {
      console.error('Error submitting prompt:', error);
      toast.error("Failed to submit prompt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoriesDisplayText = () => {
    if (formData.categories.length === 0) return "Select categories...";
    if (formData.categories.length === 1) {
      const category = sampleCategories.find(c => c.slug === formData.categories[0]);
      return category ? `${category.icon} ${category.name}` : formData.categories[0];
    }
    return `${formData.categories.length} categories selected`;
  };



  return (
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
            <div className="mb-8">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-blue-900">Prefer to raise a PR?</h3>
                        <p className="text-sm text-blue-700">Contribute directly to the GitHub repository</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link 
                        href="https://github.com/onlyoneaman/awesome-prompts/blob/main/CONTRIBUTING.md" 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Guide
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form - Always visible */}
            <Card>
              <CardHeader>
                <CardTitle>Prompt Details</CardTitle>
                <CardDescription>
                  Fill out the form below to share your prompt with the community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Prompt Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Marketing Copy Generator"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Brief description of what this prompt does and how it helps users..."
                    />
                  </div>

                  {/* Actual Prompt Text */}
                  <div className="space-y-2">
                    <Label htmlFor="actual_text">
                      Prompt Text *
                    </Label>
                    <Textarea
                      id="actual_text"
                      name="actual_text"
                      value={formData.actual_text}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="font-mono text-sm"
                      placeholder="Enter your prompt text here. Use [BRACKETS] for user-replaceable variables..."
                    />
                    <p className="text-sm text-gray-500">
                      Use [BRACKETS] for placeholders that users should replace (e.g., [TOPIC], [AUDIENCE], [TONE])
                    </p>
                  </div>

                  {/* Categories - Multi-select Dropdown */}
                  <div className="space-y-2">
                    <Label>
                      Categories * (Select all that apply)
                    </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                          type="button"
                        >
                          {getCategoriesDisplayText()}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-80">
                        <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {sampleCategories.map((category) => (
                          <DropdownMenuCheckboxItem
                            key={category.id}
                            checked={formData.categories.includes(category.slug)}
                            onCheckedChange={() => handleCategoryChange(category.slug)}
                          >
                            <span className="flex items-center gap-2">
                              <span>{category.icon}</span>
                              {category.name}
                            </span>
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {formData.categories.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {formData.categories.map((categorySlug) => {
                          const category = sampleCategories.find(c => c.slug === categorySlug);
                          return category ? (
                            <span
                              key={categorySlug}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                            >
                              {category.icon} {category.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="e.g., copywriting, email, sales, conversion (comma-separated)"
                    />
                    <p className="text-sm text-gray-500">
                      Separate multiple tags with commas
                    </p>
                  </div>

                  {/* Difficulty Level */}
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">
                      Difficulty Level
                    </Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value: "beginner" | "intermediate" | "advanced") => 
                        setFormData(prev => ({ ...prev, difficulty: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select difficulty level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Use Cases */}
                  <div className="space-y-2">
                    <Label htmlFor="use_cases">
                      Use Cases (comma-separated)
                    </Label>
                    <Input
                      id="use_cases"
                      name="use_cases"
                      value={formData.use_cases}
                      onChange={handleInputChange}
                      placeholder="e.g., Email marketing, content creation, social media"
                    />
                  </div>

                  {/* Author Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                      Author Information (Optional)
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Author Name */}
                      <div className="space-y-2">
                        <Label htmlFor="author">
                          Your Name
                        </Label>
                        <Input
                          id="author"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          placeholder="Your name for attribution"
                        />
                      </div>

                      {/* Website */}
                      <div className="space-y-2">
                        <Label htmlFor="author_website">
                          Website / Portfolio
                        </Label>
                        <Input
                          type="url"
                          id="author_website"
                          name="author_website"
                          value={formData.author_website}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="author_email">
                          Email
                        </Label>
                        <Input
                          type="email"
                          id="author_email"
                          name="author_email"
                          value={formData.author_email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                        />
                        <p className="text-xs text-gray-500">
                          We&apos;ll only use this to contact you about your submission
                        </p>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="author_phone">
                          Phone (Optional)
                        </Label>
                        <Input
                          type="tel"
                          id="author_phone"
                          name="author_phone"
                          value={formData.author_phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      {/* Twitter */}
                      <div className="space-y-2">
                        <Label htmlFor="author_twitter">
                          Twitter
                        </Label>
                        <Input
                          id="author_twitter"
                          name="author_twitter"
                          value={formData.author_twitter}
                          onChange={handleInputChange}
                          placeholder="@yourusername"
                        />
                      </div>

                      {/* GitHub */}
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="author_github">
                          GitHub
                        </Label>
                        <Input
                          id="author_github"
                          name="author_github"
                          value={formData.author_github}
                          onChange={handleInputChange}
                          placeholder="yourusername"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !formData.title || !formData.description || !formData.actual_text || formData.categories.length === 0}
                      className="w-full"
                    >
                      {isSubmitting ? "Submitting..." : "Share Prompt"}
                    </Button>
                  </div>
                </form>


              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Guidelines
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
  );
} 