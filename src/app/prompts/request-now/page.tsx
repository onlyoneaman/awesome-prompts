"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RequestNowPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    task: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      // Create the request object
      const requestData = {
        ...formData,
        id: `request-${Date.now()}`,
        type: "prompt_request",
        created_at: new Date().toISOString(),
      };

      // API call to log the event
      await axios.post(submitEndpoint, {
        event: "prompt_request",
        duration: 0,
        request_data: requestData,
        response_data: {},
        user_id: ""
      });

      console.log('Request submitted successfully:', requestData);
      toast.success("Request submitted successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        contact: "",
        task: ""
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Request Prompt
            </h1>
            <p className="text-xl text-gray-600">
              Need a custom AI prompt? Fill out the form below or reach out directly on X.
            </p>
          </div>

          <div className="space-y-6">
            {/* Form Card */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Request Form</CardTitle>
                <CardDescription>
                  Tell us what you need and we'll create a custom prompt for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <Label htmlFor="contact">
                      Contact *
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      type="email"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                    <p className="text-xs text-gray-500">
                      We'll use this to get back to you
                    </p>
                  </div>

                  {/* Task */}
                  <div className="space-y-2">
                    <Label htmlFor="task">
                      Task *
                    </Label>
                    <Textarea
                      id="task"
                      name="task"
                      value={formData.task}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Describe what you need..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !formData.name || !formData.contact || !formData.task}
                      className="w-full"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* X.com Option Card */}
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Or text me on X</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="py-4">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-8 py-6"
                    asChild
                  >
                    <Link 
                      href="https://x.com/onlyoneaman" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Message on X.com
                    </Link>
                  </Button>
                </div>
                <p className="text-gray-600">
                  <Link 
                    href="https://x.com/onlyoneaman" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    x.com/onlyoneaman
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

