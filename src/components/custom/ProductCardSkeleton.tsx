import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#F7F5F7] rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      {/* Product Image Section Skeleton */}
      <div className="relative bg-lavender-100 p-4">
        <div className="w-full h-48 bg-lavender-200 rounded animate-pulse"></div>
        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full animate-pulse"></div>
      </div>

      {/* Product Info Section Skeleton */}
      <div className="p-4 bg-white">
        {/* Title and Category Skeleton */}
        <div className="mb-3">
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        {/* Price and Rating Row Skeleton */}
        <div className="flex justify-between items-start mb-3">
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
            <div className="h-3 bg-gray-200 rounded w-12 ml-1 animate-pulse"></div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex space-x-2 justify-between">
          <div className="flex-1 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
