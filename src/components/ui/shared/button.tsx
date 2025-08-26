import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-accent text-text-primary shadow-xs hover:bg-accent/90 cursor-pointer",
        dangerous: "bg-red-500 text-white shadow-xs hover:bg-red-500/90 cursor-pointer",
        destructive: "bg-accent/80 text-white shadow-xs",
        secondary: "bg-button text-text-primary shadow-xs hover:bg-button/80 cursor-pointer",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabledMessage,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    disabledMessage?: string;
  }) {
  const Comp = asChild ? Slot : "button";

  if (disabled && disabledMessage) {
    return (
      <div className='relative group inline-block'>
        <Comp
          data-slot='button'
          className={cn(buttonVariants({ variant, size, className }))}
          disabled
          {...props}
        />
        <span
          className='absolute -bottom-10 left-2
          bg-gray-800 text-white text-xs rounded px-2 py-1
          opacity-0 group-hover:opacity-100 transition-opacity
          pointer-events-none
        '>
          {disabledMessage}
        </span>
      </div>
    );
  }

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      {...props}
    />
  );
}

export { Button, buttonVariants };
