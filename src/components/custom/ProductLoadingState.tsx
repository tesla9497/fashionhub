import React from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Skeleton } from "../ui/skeleton";
import { ProductLoadingStateProps } from "../../types";

const ProductLoadingState: React.FC<ProductLoadingStateProps> = ({
  skeletonCount = 12,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-white pt-4 pb-8">
      {/* Skeleton for search and filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Skeleton className="w-full h-10 rounded-lg" />
        <Skeleton className="w-[180px] h-10 rounded-lg hidden md:block" />
      </div>

      {/* Banner Skeleton */}
      <div className="mb-4">
        <Skeleton className="w-full aspect-[3/1] object-contain rounded-lg" />
      </div>

      <div className="mb-6">
        <h2 className="sr-only">Product Grid</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(skeletonCount)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductLoadingState;
