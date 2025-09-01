export const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    // Sign up errors
    case 'auth/email-already-in-use':
      return 'Email already exists. Please use a different email or sign in.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please enter a valid email.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password.';
    
    // Sign in errors
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    
    // General errors
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/popup-closed-by-user':
      return 'Authentication popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Authentication popup was blocked. Please allow popups for this site.';
    
    // Default error
    default:
      return 'An error occurred. Please try again.';
  }
};

export const isFirebaseError = (error: any): error is { code: string } => {
  return error && typeof error === 'object' && 'code' in error;
};
