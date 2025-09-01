import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {
  getUserData,
  UserData,
  clearUserDataCache,
} from "../services/firebase";
import { AuthContextType, AuthProviderProps } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Local storage keys
const SHORTLIST_KEY = "fashionhub_shortlist";
const FAVORITES_KEY = "fashionhub_favorites";

// Helper functions for localStorage
const getFromStorage = (key: string): string[] => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return [];
  }
};

const saveToStorage = (key: string, value: string[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load shortlist and favorites from localStorage on mount
  useEffect(() => {
    setShortlist(getFromStorage(SHORTLIST_KEY));
    setFavorites(getFromStorage(FAVORITES_KEY));
  }, []);

  // Save shortlist and favorites to localStorage whenever they change
  useEffect(() => {
    saveToStorage(SHORTLIST_KEY, shortlist);
  }, [shortlist]);

  useEffect(() => {
    saveToStorage(FAVORITES_KEY, favorites);
  }, [favorites]);

  const refreshUserData = async () => {
    if (currentUser) {
      try {
        clearUserDataCache(currentUser.uid);
        const data = await getUserData(currentUser.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    }
  };

  // Shortlist management functions
  const addToShortlist = (productId: string) => {
    setShortlist((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const removeFromShortlist = (productId: string) => {
    setShortlist((prev) => prev.filter((id) => id !== productId));
  };

  const isInShortlist = (productId: string): boolean => {
    return shortlist.includes(productId);
  };

  const clearShortlist = () => {
    setShortlist([]);
  };

  // Favorites management functions
  const addToFavorites = (productId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== productId));
  };

  const isInFavorites = (productId: string): boolean => {
    return favorites.includes(productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      // Set loading to false immediately after auth state is determined
      // This allows the app to render faster while user data loads in background
      setLoading(false);

      if (user) {
        // Fetch user data in background without blocking the UI
        getUserData(user.uid)
          .then((data) => {
            setUserData(data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            // Don't set loading back to true on error
          });
      } else {
        setUserData(null);
        // Clear shortlist and favorites when user logs out
        setShortlist([]);
        setFavorites([]);
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    shortlist,
    favorites,
    setUserData,
    refreshUserData,
    addToShortlist,
    removeFromShortlist,
    addToFavorites,
    removeFromFavorites,
    isInShortlist,
    isInFavorites,
    clearShortlist,
    clearFavorites,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
