import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        style: {
          background: "oklch(0.98 0.03 120)",
          color: "oklch(0.145 0 0)",
          border: "1px solid oklch(69.926% 0.00008 271.152)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
