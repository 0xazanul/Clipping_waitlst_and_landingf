import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-[clamp(2rem,6vw,2.25rem)] w-full min-w-0 rounded-[clamp(0.25rem,1vw,0.375rem)] border bg-transparent px-[clamp(0.625rem,2.5vw,0.75rem)] py-[clamp(0.375rem,1.5vw,0.5rem)] text-[clamp(0.875rem,2.5vw,1rem)] shadow-xs transition-all duration-300 outline-none file:inline-flex file:h-[clamp(1.5rem,4vw,1.75rem)] file:border-0 file:bg-transparent file:text-[clamp(0.813rem,2.2vw,0.875rem)] file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:scale-[1.01]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
