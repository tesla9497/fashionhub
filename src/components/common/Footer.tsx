import React from "react";

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden h-80">
      {/* Background with lavender gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-100 via-lavender-200 to-lavender-300 opacity-90"></div>

      {/* Simple text content */}
      <div className="relative flex h-full flex-col z-10 px-6 py-8 text-center items-center justify-center">
        <p className="text-lavender-800 font-bold text-3xl">Footer</p>
      </div>
    </footer>
  );
};
