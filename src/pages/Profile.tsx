import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { User, Save } from "lucide-react";
import { updateUserData } from "../services/firebase";
import { profileSchema, ProfileFormData } from "../validation";
import { cn } from "../libs/utils";
import { toast } from "sonner";

export const Profile = () => {
  const { currentUser, userData, refreshUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: userData?.name || "",
      mobile: userData?.mobile || "",
    },
  });

  // Reset form when userData changes
  React.useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        mobile: userData.mobile || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!currentUser) return;

    // Trim whitespace from form data
    const trimmedData = {
      name: data.name.trim(),
      mobile: data.mobile.trim(),
    };

    setIsLoading(true);
    try {
      await updateUserData(currentUser.uid, trimmedData);
      await refreshUserData();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to view your profile
          </h1>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Header */}
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-4">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-600" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {userData?.name || "User"}
              </CardTitle>
              <CardDescription>{currentUser.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      {...register("name")}
                      className={cn(
                        "border-gray-300 focus-visible:ring-gray-500",
                        errors.name &&
                          "border-red-500 focus-visible:ring-gray-500"
                      )}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      placeholder="Enter your mobile number"
                      {...register("mobile")}
                      className={cn(
                        "border-gray-300 focus-visible:ring-gray-500",
                        errors.mobile &&
                          "border-red-500 focus-visible:ring-gray-500"
                      )}
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 justify-end">
                  <Button type="submit" disabled={isSubmitting || isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting || isLoading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
