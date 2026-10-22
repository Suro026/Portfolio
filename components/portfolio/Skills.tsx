import { Badge } from '@/components/ui/badge'
import { Section } from './Section'
import { SKILL_GROUPS } from '@/lib/data/skills'

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category}>
            <h3 className="mb-2.5 text-sm font-semibold text-foreground">{group.category}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge key={item} variant="secondary" className="font-normal">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
