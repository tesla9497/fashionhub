import React from "react";
import { cn } from "../../libs/utils";
import { LoadingProps } from "../../types";

export const Loading: React.FC<LoadingProps> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-16 w-16", // Reduced from h-32 w-32 for better performance
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-b-2 border-gray-900",
          sizeClasses[size]
        )}
      />
    </div>
  );
};

export default Loading;
