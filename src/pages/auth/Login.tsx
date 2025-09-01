import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../libs/utils";
import { Label } from "../../components/ui/label";
import { loginSchema, LoginFormData } from "../../validation";
import { signInUser } from "../../services/firebase";
import {
  getFirebaseErrorMessage,
  isFirebaseError,
} from "../../utils/firebaseErrors";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Display success message from signup redirect
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      // Trim email before signing in
      const trimmedEmail = data.email.trim();
      const trimmedPassword = data.password.trim();

      // Sign in user
      await signInUser(trimmedEmail, trimmedPassword);

      toast.success("Login successful! Welcome back!");

      // Redirect to the intended page or dashboard after successful login
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle Firebase errors
      if (isFirebaseError(error)) {
        const errorMessage = getFirebaseErrorMessage(error.code);
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred during login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="text-center text-white p-8">
            <h1 className="text-5xl font-bold mb-4">Fashion Hub</h1>
            <p className="text-xl opacity-90 mb-8">Discover Your Style</p>
            <div className="mt-8">
              <div className="w-80 h-80 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <svg
                  className="w-40 h-40 text-white/70"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.5 3C5.67 3 5 3.67 5 4.5v15c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5h-11z" />
                  <path d="M8 5h8c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1z" />
                  <path d="M10 8h4v2h-4z" />
                  <path d="M10 12h4v2h-4z" />
                  <path d="M10 16h4v1h-4z" />
                </svg>
              </div>
              <p className="text-lg mt-6 opacity-80">
                Welcome back to fashion!!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Please Login your Account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </Label>
              <Input
                id="email"
                {...register("email")}
                type="email"
                placeholder="admin@gmail.com"
                className={cn(
                  "w-full rounded-xl",
                  errors.email && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </Label>
              <Input
                id="password"
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={cn(
                  "w-full rounded-xl",
                  errors.password && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right ">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-6 text-lg font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-gray-900 font-semibold hover:underline"
              >
                Sign-Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
