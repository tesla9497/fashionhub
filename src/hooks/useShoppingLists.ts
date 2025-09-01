import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export const useShoppingLists = () => {
  const {
    shortlist,
    favorites,
    addToShortlist,
    removeFromShortlist,
    addToFavorites,
    removeFromFavorites,
    isInShortlist,
    isInFavorites,
    clearShortlist,
    clearFavorites,
  } = useAuth();

  // Toggle functions with user feedback
  const toggleShortlist = (productId: string) => {
    if (isInShortlist(productId)) {
      removeFromShortlist(productId);
      toast.success("Removed from shortlist");
    } else {
      addToShortlist(productId);
      toast.success("Added to shortlist");
    }
  };

  const toggleFavorites = (productId: string) => {
    if (isInFavorites(productId)) {
      removeFromFavorites(productId);
      toast.success("Removed from favorites");
    } else {
      addToFavorites(productId);
      toast.success("Added to favorites");
    }
  };

  // Bulk operations
  const addMultipleToShortlist = (productIds: string[]) => {
    productIds.forEach(id => {
      if (!isInShortlist(id)) {
        addToShortlist(id);
      }
    });
    toast.success(`Added ${productIds.length} products to shortlist`);
  };

  const addMultipleToFavorites = (productIds: string[]) => {
    productIds.forEach(id => {
      if (!isInFavorites(id)) {
        addToFavorites(id);
      }
    });
    toast.success(`Added ${productIds.length} products to favorites`);
  };

  // Statistics
  const getListStats = () => ({
    shortlistCount: shortlist.length,
    favoritesCount: favorites.length,
    totalItems: shortlist.length + favorites.length,
  });

  // Check if a product is in any list
  const isInAnyList = (productId: string) => {
    return isInShortlist(productId) || isInFavorites(productId);
  };

  // Get all lists a product is in
  const getProductLists = (productId: string) => {
    const lists = [];
    if (isInShortlist(productId)) lists.push('shortlist');
    if (isInFavorites(productId)) lists.push('favorites');
    return lists;
  };

  return {
    // State
    shortlist,
    favorites,
    
    // Basic operations
    addToShortlist,
    removeFromShortlist,
    addToFavorites,
    removeFromFavorites,
    isInShortlist,
    isInFavorites,
    clearShortlist,
    clearFavorites,
    
    // Enhanced operations
    toggleShortlist,
    toggleFavorites,
    addMultipleToShortlist,
    addMultipleToFavorites,
    
    // Utilities
    getListStats,
    isInAnyList,
    getProductLists,
  };
};
