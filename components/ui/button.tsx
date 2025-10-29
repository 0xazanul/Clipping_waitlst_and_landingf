import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[clamp(0.25rem,1vw,0.5rem)] whitespace-nowrap rounded-[clamp(0.25rem,1vw,0.375rem)] text-[clamp(0.813rem,2.2vw,0.875rem)] font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[clamp(0.875rem,2.5vw,1rem)] shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-sm",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-[clamp(0.2rem,0.8vw,0.25rem)] hover:underline",
      },
      size: {
        default: "h-[clamp(2rem,6vw,2.25rem)] px-[clamp(0.75rem,3vw,1rem)] py-[clamp(0.375rem,1.5vw,0.5rem)] has-[>svg]:px-[clamp(0.625rem,2.5vw,0.75rem)]",
        sm: "h-[clamp(1.75rem,5vw,2rem)] rounded-md gap-[clamp(0.25rem,1vw,0.375rem)] px-[clamp(0.625rem,2.5vw,0.75rem)] has-[>svg]:px-[clamp(0.5rem,2vw,0.625rem)]",
        lg: "h-[clamp(2.25rem,7vw,2.5rem)] rounded-md px-[clamp(1rem,4vw,1.5rem)] has-[>svg]:px-[clamp(0.75rem,3vw,1rem)]",
        icon: "size-[clamp(2rem,6vw,2.25rem)]",
        "icon-sm": "size-[clamp(1.75rem,5vw,2rem)]",
        "icon-lg": "size-[clamp(2.25rem,7vw,2.5rem)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
