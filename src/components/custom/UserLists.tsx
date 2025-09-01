import React, { useState } from "react";
import { Bookmark, Heart, Trash2, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import { Product } from "../../types";

const UserLists: React.FC = () => {
  const {
    shortlist,
    favorites,
    removeFromShortlist,
    removeFromFavorites,
    clearShortlist,
    clearFavorites,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"shortlist" | "favorites">(
    "shortlist"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products for the selected list
  const fetchProducts = async (productIds: string[]) => {
    if (productIds.length === 0) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      // Fetch products from the API
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        toast.error("Failed to fetch products");
      }

      const allProducts = await response.json();
      const filteredProducts = allProducts.filter((product: Product) =>
        productIds.includes(product.id.toString())
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: "shortlist" | "favorites") => {
    setActiveTab(tab);
    const productIds = tab === "shortlist" ? shortlist : favorites;
    fetchProducts(productIds);
  };

  // Load products when component mounts or when lists change
  React.useEffect(() => {
    const productIds = activeTab === "shortlist" ? shortlist : favorites;
    fetchProducts(productIds);
  }, [activeTab, shortlist, favorites]);

  const handleRemoveFromList = (productId: string) => {
    if (activeTab === "shortlist") {
      removeFromShortlist(productId);
      toast.success("Removed from shortlist");
    } else {
      removeFromFavorites(productId);
      toast.success("Removed from favorites");
    }
  };

  const handleClearList = () => {
    if (activeTab === "shortlist") {
      clearShortlist();
      toast.success("Shortlist cleared");
    } else {
      clearFavorites();
      toast.success("Favorites cleared");
    }
  };

  const currentList = activeTab === "shortlist" ? shortlist : favorites;
  const currentListName = activeTab === "shortlist" ? "Shortlist" : "Favorites";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Lists</h1>
        <p className="text-gray-600">Manage your shortlist and favorites</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        <button
          onClick={() => handleTabChange("shortlist")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
            activeTab === "shortlist"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span>Shortlist ({shortlist.length})</span>
        </button>
        <button
          onClick={() => handleTabChange("favorites")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
            activeTab === "favorites"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Favorites ({favorites.length})</span>
        </button>
      </div>

      {/* List Actions */}
      {currentList.length > 0 && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentListName} ({currentList.length} items)
          </h2>
          <Button
            variant="outline"
            onClick={handleClearList}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear {currentListName}
          </Button>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg h-80 animate-pulse"
            />
          ))}
        </div>
      ) : currentList.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            {activeTab === "shortlist" ? (
              <Bookmark className="w-16 h-16 mx-auto" />
            ) : (
              <Heart className="w-16 h-16 mx-auto" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your {currentListName} is empty
          </h3>
          <p className="text-gray-600 mb-4">
            {activeTab === "shortlist"
              ? "Start adding products to your shortlist to save them for later."
              : "Start adding products to your favorites to keep track of what you love."}
          </p>
          <Button onClick={() => window.history.back()}>Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="relative bg-gray-50 p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain"
                />

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromList(product.id.toString())}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label={`Remove from ${currentListName.toLowerCase()}`}
                  title={`Remove from ${currentListName.toLowerCase()}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 capitalize mb-2">
                  {product.category}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserLists;
