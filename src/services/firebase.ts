import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase";

// Cache for user data to avoid repeated Firestore calls
const userDataCache = new Map<string, { data: UserData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// User interface for Firestore
export interface UserData {
  uid: string;
  name: string;
  email: string;
  mobile: string;
  dateOfBirth: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Signup function
export const signUpUser = async (
  email: string,
  password: string,
  userData: Omit<UserData, "uid" | "createdAt" | "updatedAt">
): Promise<UserCredential> => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const now = new Date();

    // Prepare user data for Firestore
    const firestoreUserData: UserData = {
      uid: user.uid,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      dateOfBirth: userData.dateOfBirth,
      createdAt: now,
      updatedAt: now,
    };

    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), firestoreUserData);

    return userCredential;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

// Login function
export const signInUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};

// Signout function
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out user:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Get user data from Firestore with caching
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    // Check cache first
    const cached = userDataCache.get(uid);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      
      // Cache the result
      userDataCache.set(uid, { data: userData, timestamp: Date.now() });
      
      return userData;
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

// Check if email already exists
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
};

// Clear user data cache
export const clearUserDataCache = (uid?: string) => {
  if (uid) {
    userDataCache.delete(uid);
  } else {
    userDataCache.clear();
  }
};

// Update user data
export const updateUserData = async (
  uid: string,
  updates: Partial<Omit<UserData, "uid" | "createdAt">>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      { ...updates, updatedAt: new Date() },
      { merge: true }
    );
    
    // Clear cache for this user to ensure fresh data
    clearUserDataCache(uid);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
