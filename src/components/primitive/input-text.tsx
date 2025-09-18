import clsx from "clsx";
import React from "react";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const InputText = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }: Props, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={clsx(
          "h-10 leading-6 px-3 py-2 border border-gray-200 rounded-md bg-transparent text-sm text-gray-950 placeholder-gray-500",
          "hover:border-gray-400",
          "focus:outline-none focus:border-pink-400",
          className,
        )}
        {...props}
      />
    );
  },
);
