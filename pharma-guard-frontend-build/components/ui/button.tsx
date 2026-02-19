import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    // Base
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "overflow-hidden",                       // needed for shine pseudo-element
    "transition-all duration-200 ease-out",
    "active:scale-[0.97]",
    "disabled:pointer-events-none disabled-opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    // Shine layer — a pseudo-element that sweeps across on hover
    "before:absolute before:inset-0 before:-translate-x-full before:skew-x-[-20deg]",
    "before:bg-white/15 before:transition-transform before:duration-500",
    "hover:before:translate-x-[150%]",
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-primary-foreground shadow-sm',
          'hover:bg-primary/90 hover:shadow-primary/40 hover:shadow-lg hover:scale-[1.02]',
        ].join(' '),
        destructive: [
          'bg-destructive text-white shadow-sm',
          'hover:bg-destructive/90 hover:shadow-destructive/40 hover:shadow-lg hover:scale-[1.02]',
          'focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        ].join(' '),
        outline: [
          'border bg-background shadow-xs text-foreground',
          'hover:bg-accent hover:text-foreground hover:border-primary/60 hover:shadow-sm hover:scale-[1.02]',
          'dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        ].join(' '),
        secondary: [
          'bg-secondary text-secondary-foreground shadow-xs',
          'hover:bg-secondary/80 hover:scale-[1.02]',
        ].join(' '),
        ghost: [
          'text-foreground',
          'hover:bg-accent hover:text-foreground hover:scale-[1.02]',
          'dark:hover:bg-accent/50',
        ].join(' '),
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

