import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='skeleton'
      className={cn("bg-[oklch(37.1%_0_0)] animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
