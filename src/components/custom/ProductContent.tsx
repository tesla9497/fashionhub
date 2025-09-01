import React from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { ProductContentProps } from "../../types";

const ProductContent: React.FC<ProductContentProps> = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="sr-only">Product Grid</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            image={product.image}
            rating={product.rating}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ProductContent;
