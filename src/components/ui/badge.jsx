import React from "react";
import { cn } from "../../lib/utils";
/* eslint-disable react/prop-types */

const Badge = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
      default: "bg-primary text-white",
      outline: "border border-neutral-medium bg-white text-neutral-dark",
      secondary: "bg-secondary text-white",
    };

    return (
      <span
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
