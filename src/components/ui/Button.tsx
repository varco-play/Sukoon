import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'gold' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  gold: 'bg-brand-gold text-brand-green-dark font-semibold hover:bg-brand-gold-light shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0',
  outline: 'border border-brand-gold text-brand-gold hover:bg-brand-gold/10 hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-brand-cream-muted hover:text-brand-cream hover:bg-white/5',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const base =
  'inline-flex items-center justify-center gap-2 tracking-wide transition-all duration-200 rounded-sm cursor-pointer select-none'

export function buttonVariants({ variant = 'gold', size = 'md' }: { variant?: Variant; size?: Size } = {}): string {
  return `${base} ${variantClasses[variant]} ${sizeClasses[size]}`
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  loading?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'gold',
  size = 'md',
  href,
  loading,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `${buttonVariants({ variant, size })} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  )
}
