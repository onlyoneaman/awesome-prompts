import React from "react";
import { Star } from "lucide-react";

// Helper function to convert difficulty to stars
export function getDifficultyStars(difficulty: string | undefined): React.JSX.Element {
  const getStarCount = (diff: string | undefined): number => {
    switch (diff?.toLowerCase()) {
      case 'beginner':
        return 1;
      case 'intermediate':
        return 2;
      case 'advanced':
        return 3;
      default:
        return 0;
    }
  };

  const starCount = getStarCount(difficulty);
  
  if (starCount === 0) return <></>;
  
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: starCount }, (_, i) => (
        <Star size={14} key={i} className="text-yellow-500" />
      ))}
    </div>
  );
}

// Helper function to get prompt type icon
export function getPromptTypeIcon(type: string | undefined): string {
  switch (type) {
    case 'image':
      return '🖼️';
    case 'video':
      return '🎬';
    default: // Handles 'text', undefined, or any unknown type
      return '📄';
  }
} 