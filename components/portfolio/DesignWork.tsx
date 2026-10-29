import { LayoutGrid, Megaphone, Palette, PenTool, Share2, Sprout } from 'lucide-react'
import { Section } from './Section'
import { DESIGN_CATEGORIES, type DesignCategory } from '@/lib/data/design-work'

const ICON: Record<DesignCategory['icon'], React.ComponentType<{ className?: string }>> = {
  layout: LayoutGrid,
  palette: Palette,
  megaphone: Megaphone,
  share: Share2,
  sprout: Sprout,
  pen: PenTool,
}

export function DesignWork() {
  return (
    <Section id="design-work" title="Design Work">
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Alongside engineering, I design — interfaces, identity, and campus creatives. Case studies and samples are
        added here as each piece of work is ready to share.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {DESIGN_CATEGORIES.map((category) => {
          const Icon = ICON[category.icon]
          return (
            <div key={category.id} className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
