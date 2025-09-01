import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { cn } from "../../libs/utils";
import { Label } from "../../components/ui/label";
import { signupSchema, SignupFormData } from "../../validation";
import { signUpUser, checkEmailExists } from "../../services/firebase";
import {
  getFirebaseErrorMessage,
  isFirebaseError,
} from "../../utils/firebaseErrors";

const Signup = () => {
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    setError: setFormError,
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
  });

  const watchedPassword = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);

      // Trim all form data
      const trimmedData = {
        name: data.name.trim(),
        email: data.email.trim(),
        mobile: data.mobile.trim(),
        password: data.password.trim(),
      };

      // Check if email already exists
      const emailExists = await checkEmailExists(trimmedData.email);
      if (emailExists) {
        setFormError("email", {
          type: "manual",
          message:
            "Email already exists. Please use a different email or sign in.",
        });
        toast.error(
          "Email already exists. Please use a different email or sign in."
        );
        return;
      }

      // Create user account
      await signUpUser(trimmedData.email, trimmedData.password.trim(), {
        name: trimmedData.name,
        email: trimmedData.email,
        mobile: trimmedData.mobile,
        dateOfBirth: date || null,
      });

      toast.success("Account created successfully! Please sign in.");

      // Redirect to login page after successful signup
      navigate("/login", {
        state: { message: "Account created successfully! Please sign in." },
      });
    } catch (error: any) {
      console.error("Signup error:", error);

      // Handle Firebase errors
      if (isFirebaseError(error)) {
        const errorMessage = getFirebaseErrorMessage(error.code);
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred during signup. Please try again.");
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
                Join the fashion revolution
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create an Account
            </h1>
            <p className="text-gray-600">
              Are you ready to join us! Let's create Account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                type="text"
                placeholder="John Doe"
                className={cn(
                  "w-full rounded-xl",
                  errors.name && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            {/* Date Field */}
            <div>
              <Label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className={cn(
                      "w-full justify-between text-left font-normal rounded-xl",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>D/M/YYYY</span>}
                    <CalendarIcon className="mr-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      if (selectedDate) {
                        setValue("dateOfBirth", selectedDate);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            {/* Mobile Field */}
            <div>
              <Label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mobile
              </Label>
              <Input
                id="mobile"
                {...register("mobile")}
                type="tel"
                placeholder="1234567891"
                className={cn(
                  "w-full rounded-xl",
                  errors.mobile && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
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
              {watchedPassword && !errors.password && (
                <div className="mt-2">
                  <div className="flex space-x-1">
                    {[
                      { regex: /.{8,}/, label: "8+ chars" },
                      { regex: /[a-z]/, label: "lowercase" },
                      { regex: /[A-Z]/, label: "uppercase" },
                      { regex: /\d/, label: "number" },
                      { regex: /[@$!%*?&]/, label: "special" },
                    ].map(({ regex, label }) => (
                      <span
                        key={label}
                        className={cn(
                          "text-xs px-2 py-1 rounded",
                          regex.test(watchedPassword)
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-6 text-lg font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-gray-900 font-semibold hover:underline"
              >
                Sign-In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
