export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface ProductLoadingStateProps {
  skeletonCount?: number;
}

export interface ProductErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export interface ProductContentProps {
  products: import('./product').Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
}