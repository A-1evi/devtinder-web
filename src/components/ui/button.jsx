import React from "react";
/* eslint-disable react/prop-types */
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default: "bg-blue-900 text-white hover:bg-primary/90",
      ghost: "hover:bg-neutral-light hover:text-neutral-dark",
      outline: "border border-neutral-medium bg-white hover:bg-neutral-light",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
