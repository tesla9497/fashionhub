import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Loading } from "../ui/loading";
import { ProtectedRouteProps } from "../../types";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Use smaller loading spinner for better perceived performance
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="md" />
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login page with the current location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
