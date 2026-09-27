import type { DialogueLine } from '@/types/game'

export const DIALOGUE: Record<string, DialogueLine[]> = {
  'home-guide': [
    { speaker: 'ARIA', text: "Systems online. Welcome to Surajit's world." },
    { speaker: 'ARIA', text: "Everyone calls him Suro — Aspiring AI Engineer, IoT Systems Builder, and UI/UX Designer." },
    { speaker: 'ARIA', text: 'Walk with WASD or the arrow keys. Press E near anything glowing to interact.' },
    { speaker: 'ARIA', text: 'The bookshelf behind me holds his resume. The doors lead to his work — go explore.' },
  ],
  'rubber-duck': [
    { speaker: '???', text: '...' },
    { speaker: 'Rubber Duck', text: 'Quack. You found me.' },
    { speaker: 'Rubber Duck', text: 'Every good engineer needs someone to explain their bugs to.' },
    { speaker: 'Rubber Duck', text: 'Achievement unlocked, by the way. Don\'t tell anyone I talk.' },
  ],
  'secret-lab-npc': [
    { speaker: 'Archive Log', text: 'SUBLEVEL ACCESS GRANTED.' },
    { speaker: 'Archive Log', text: 'You found the part of the map that isn\'t on the map.' },
    { speaker: 'Archive Log', text: 'Curiosity is basically the whole job description for an engineer.' },
  ],
  'ai-lab-guide': [
    { speaker: 'Lab Assistant', text: 'Welcome to the AI Laboratory.' },
    { speaker: 'Lab Assistant', text: 'Each machine here powers a real project. Press E on one to open it up.' },
  ],
  'design-studio-guide': [
    { speaker: 'Curator', text: 'Every frame here is a design pass, prototyped in Figma.' },
    { speaker: 'Curator', text: 'Hover close and the depth kicks in — go on, look around.' },
  ],
  'arena-guide': [
    { speaker: 'Announcer', text: 'Step up to the podium, champion.' },
    { speaker: 'Announcer', text: 'Every trophy here was earned the hard way — under a deadline.' },
  ],
}
