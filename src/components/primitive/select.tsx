import clsx from "clsx";
import React from "react";
import { Icon } from "../icon";

type RootProps = React.SelectHTMLAttributes<HTMLSelectElement>;

type OptionProps = React.OptionHTMLAttributes<HTMLOptionElement>;

const Root = React.forwardRef<HTMLSelectElement, RootProps>(
  ({ className, children, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value ?? "");

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    // in case the value is controlled from outside
    if (props.value !== undefined && props.value !== value) {
      setValue(props.value);
    }

    return (
      <div className={clsx("relative h-10", className)}>
        <select
          ref={ref}
          className={clsx(
            "w-full h-full leading-6 px-3 py-2 pr-7 border border-gray-200 rounded-md bg-transparent text-sm placeholder-gray-500 appearance-none",
            "disabled:opacity-50 disabled:border-gray-200 disabled:cursor-not-allowed",
            "hover:bg-gray-100 hover:border-gray-200",
            "focus:outline-none focus-visible:border-pink-400",
            {
              "text-gray-950 ": value,
              "text-gray-500": !value,
            },
          )}
          {...props}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>

        <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-1xl text-gray-400">
          <Icon.ChevronDown />
        </div>
      </div>
    );
  },
);

const Option = React.forwardRef<HTMLOptionElement, OptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <option
        ref={ref}
        className={clsx("text-sm text-gray-950", className)}
        {...props}
      >
        {children}
      </option>
    );
  },
);

export const Select = {
  Root,
  Option,
};
