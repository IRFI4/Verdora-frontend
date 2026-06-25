import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-white text-[var(--text)] border border-[var(--border)] hover:bg-gray-50",
        active:
          "bg-[var(--accent)] text-[var(--accent-text)] hover:bg-[var(--accent-hover)] cursor-pointer",
        inactive:
          "bg-[var(--accent-inactive)] text-[var(--accent-text)] hover:cursor-not-allowed",
        outline:
          "bg-white text-[var(--text)] hover:bg-gray-50 border-2 border-[var(--border)] hover:border-[var(--accent)]",
        ghost:
          "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link:
          "text-primary underline-offset-4 hover:underline",
        click:
          "",
      },
      size: {
        default:
          "h-40 gap-6 rounded-lg px-16 text-sm [&_svg:not([class*='size-'])]:size-16",
        xs: "h-24 gap-4 rounded-md px-8 text-xs [&_svg:not([class*='size-'])]:size-12",
        sm: "h-32 gap-4 rounded-[min(var(--radius-md),12px)] px-12 text-[0.8rem] [&_svg:not([class*='size-'])]:size-14",
        lg: "h-48 gap-8 px-24 text-[15px] [&_svg:not([class*='size-'])]:size-18",
        icon: "size-36 rounded-md",
        "icon-xs":
          "size-24 rounded-md [&_svg:not([class*='size-'])]:size-12",
        "icon-sm":
          "size-28 rounded-md",
        "icon-lg": "size-44 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "active",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "active",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
