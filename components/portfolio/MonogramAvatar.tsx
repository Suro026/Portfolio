import { cn } from '@/lib/utils'

export function MonogramAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-accent-foreground shadow-lg shadow-primary/20 ring-1 ring-border',
        className,
      )}
      aria-hidden
    >
      <span className="relative font-serif text-[2.6em] font-semibold leading-none text-primary-foreground">S</span>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
    </div>
  )
}
