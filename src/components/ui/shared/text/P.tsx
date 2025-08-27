import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const paragraphVariants = cva("", {
  variants: {
    variant: {
      default: "text-text-primary",
      error: "text-red-500",
    },
    size: {
      default: "text-[16px] font-normal",
      lg: "text-[18px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export default function P({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof paragraphVariants>) {
  return (
    <p className={cn(paragraphVariants({ className, variant, size }))} {...props}>
      {children}
    </p>
  );
}
