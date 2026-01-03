import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubmitPromptPage() {
  return (
    <div className="bg-gray-50 py-6">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Share Your Prompt
            </h1>
            <p className="text-xl text-gray-600">
              Want to contribute a prompt? Just reach out!
            </p>
          </div>

          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Text me on X</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="py-4">
                <Button 
                  size="lg" 
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
  );
} 