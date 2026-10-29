import { Award, FileCheck2, Sparkles, Trophy, Users } from 'lucide-react'
import { Section } from './Section'
import { ACHIEVEMENTS, type AchievementEntry } from '@/lib/data/achievements'

const TYPE_ICON: Record<AchievementEntry['type'], React.ComponentType<{ className?: string }>> = {
  award: Trophy,
  selection: Sparkles,
  certificate: FileCheck2,
  participation: Users,
  contribution: Award,
}

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <ul className="grid gap-4 sm:grid-cols-2">
        {ACHIEVEMENTS.map((entry) => {
          const Icon = TYPE_ICON[entry.type]
          return (
            <li key={entry.id} className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="text-sm font-semibold text-foreground">{entry.title}</h3>
                  {entry.year && <span className="text-xs text-muted-foreground">{entry.year}</span>}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.detail}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
