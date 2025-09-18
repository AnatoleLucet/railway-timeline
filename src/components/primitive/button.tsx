import clsx from "clsx";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      type = "button", // default to "button" to prevent form submission if used inside a form
      variant = "primary",
      className,
      children,
      ...props
    }: Props,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "h-10 leading-5 py-1.5 px-3 flex items-center justify-center border rounded-md transform transition-transform duration-50 text-sm space-x-2 font-medium",
          "active:scale-95",
          "focus:outline-none focus-visible:ring-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          {
            "bg-pink-500 border-pink-500 text-foreground hover:bg-pink-600":
              variant === "primary",
            "bg-transparent border-pink-200 text-pink-700 hover:bg-pink-100":
              variant === "secondary",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
