import { HTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "common" | "uncommon" | "rare" | "legendary" | "default";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-muted text-muted-foreground",
    common: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    uncommon: "bg-green-500/10 text-green-400 border border-green-500/20",
    rare: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    legendary: "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(225,29,72,0.2)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
