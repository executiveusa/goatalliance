import { type ButtonHTMLAttributes, forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-keppel disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-keppel text-charcoal hover:bg-keppel/90",
        outline: "border border-keppel text-keppel hover:bg-keppel hover:text-charcoal",
        ghost: "text-white hover:bg-white/10"
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Component = asChild ? Slot : "button"
  return <Component ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
})

export type { ButtonProps }
