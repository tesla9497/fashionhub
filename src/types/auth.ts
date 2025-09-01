import { User } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';

export interface UserData {
  uid: string;
  name: string;
  email: string;
  mobile: string;
  dateOfBirth: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  shortlist: string[];
  favorites: string[];
  loading: boolean;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
  refreshUserData: () => Promise<void>;
  addToShortlist: (productId: string) => void;
  removeFromShortlist: (productId: string) => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isInShortlist: (productId: string) => boolean;
  isInFavorites: (productId: string) => boolean;
  clearShortlist: () => void;
  clearFavorites: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
