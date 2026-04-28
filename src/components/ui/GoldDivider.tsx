interface GoldDividerProps {
  ornament?: boolean
  className?: string
}

export default function GoldDivider({ ornament = false, className = '' }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-gold/40" />
      {ornament && (
        <span className="text-brand-gold text-xs">◆</span>
      )}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-gold/40" />
    </div>
  )
}
