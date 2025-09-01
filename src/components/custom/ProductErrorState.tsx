import React from "react";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import { ProductErrorStateProps } from "../../types";

const ProductErrorState: React.FC<ProductErrorStateProps> = ({
  error,
  onRetry,
}) => {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Products
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              className="bg-[#3A4980] text-white hover:bg-[#2A3A70] transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductErrorState;
