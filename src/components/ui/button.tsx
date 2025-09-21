import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-neon-lime text-terminal-bg hover:bg-neon-gold font-semibold shadow-lg hover:shadow-xl",
        destructive: "bg-loss text-foreground hover:bg-loss/90 border border-loss/50",
        outline: "border border-terminal bg-transparent hover:bg-terminal-surface hover:border-neon-lime text-foreground",
        secondary: "bg-terminal-surface text-foreground hover:bg-muted border border-terminal",
        ghost: "hover:bg-terminal-surface hover:text-foreground text-muted-foreground",
        link: "text-neon-cyan underline-offset-4 hover:underline hover:text-neon-lime",
        neon: "bg-gradient-to-r from-neon-cyan to-neon-magenta text-terminal-bg hover:from-neon-lime hover:to-neon-gold font-bold shadow-lg hover:shadow-2xl",
        terminal: "bg-terminal-bg border-2 border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-terminal-bg font-mono font-bold",
        profit: "bg-profit text-terminal-bg hover:bg-profit/90 font-semibold",
        loss: "bg-loss text-foreground hover:bg-loss/90 font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
