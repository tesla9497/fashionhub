import React from "react";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { StarRating } from "./StarRating";
import { useShoppingLists } from "../../hooks/useShoppingLists";
import { ProductCardProps } from "../../types";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  category,
  image,
  rating,
}) => {
  const { toggleShortlist, toggleFavorites, isInShortlist, isInFavorites } =
    useShoppingLists();

  return (
    <div className="bg-[#F7F5F7] rounded-lg border border-gray-200 overflow-hidden transition-shadow duration-300">
      {/* Product Image Section */}
      <div className="relative bg-lavender-100 p-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain"
          loading="lazy"
          decoding="async"
        />

        {/* Favorites Button */}
        <button
          onClick={() => toggleFavorites(id.toString())}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            isInFavorites(id.toString())
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white text-lavender-600 hover:bg-lavender-50"
          }`}
          aria-label={
            isInFavorites(id.toString())
              ? "Remove from favorites"
              : "Add to favorites"
          }
          title={
            isInFavorites(id.toString())
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            className={`w-6 h-6 ${
              isInFavorites(id.toString()) ? "fill-current" : ""
            }`}
          />
        </button>
      </div>

      {/* Product Info Section */}
      <div className="p-4 bg-white">
        {/* Title and Category */}
        <div className="mb-3">
          <div className="font-semibold text-sm text-black mb-1 line-clamp-2 h-10 overflow-hidden">
            {title}
          </div>
          <p className="text-xs text-gray-500 capitalize">
            {category} available
          </p>
        </div>

        {/* Price and Rating Row */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-black">
              ₹{price.toFixed(2)}
            </span>
          </div>
          <StarRating
            rating={rating.rate}
            showCount={true}
            count={rating.count}
            size="md"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 justify-between">
          <Button className="flex-1 bg-[#3A4980] text-white rounded-full">
            Add To Cart
          </Button>
          <Button
            variant="outline"
            className={`flex-1 rounded-full transition-colors ${
              isInShortlist(id.toString())
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : ""
            }`}
            onClick={() => toggleShortlist(id.toString())}
          >
            {isInShortlist(id.toString()) ? "In Shortlist" : "Add Shortlist"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
