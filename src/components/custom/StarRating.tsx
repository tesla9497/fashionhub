import React from "react";
import { Star } from "lucide-react";
import { StarRatingProps } from "../../types";

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = "md",
  showCount = false,
  count,
}) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const stars = () => {
    const starElements = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < maxStars; i++) {
      if (i < fullStars) {
        starElements.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        starElements.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`}
          />
        );
      } else {
        starElements.push(
          <Star key={i} className={`${sizeClasses[size]} text-gray-300`} />
        );
      }
    }
    return starElements;
  };
  return (
    <div className="flex items-center space-x-1">
      {stars()}
      {showCount && count !== undefined && (
        <span className="text-xs text-gray-600 ml-1">({count})</span>
      )}
    </div>
  );
};
