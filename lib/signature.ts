// An illegible, confident signature generated from a name: a looped capital,
// one hump per letter (tall ones reach up, deep ones dip), and a flourish that
// sweeps back under it all. Seeded by the name, so it is the same every time.
// Ported from the sidebar-portfolio-template reference's signature generator.
type Pt = [number, number]

function seedOf(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0 || 1
}

function rng(seed: number): () => number {
  let a = seed
  return () => {
    a ^= a << 13
    a ^= a >>> 17
    a ^= a << 5
    return ((a >>> 0) % 10007) / 10007
  }
}

function signaturePoints(name: string): Pt[] {
  const first = (name.trim().split(/\s+/)[0] || '').replace(/[^A-Za-z]/g, '')
  const r = rng(seedOf(name.trim().toLowerCase() || 'a'))
  const pts: Pt[] = [
    [6, 44],
    [13, 22 + r() * 3],
    [17, 6],
    [32, 7],
    [33, 17],
    [15, 24],
    [24, 31],
  ]
  let x = 27
  for (const ch of first.slice(1, 8).toLowerCase()) {
    const w = 6 + r() * 4
    const top = 'bdfhklt'.includes(ch) ? 11 + r() * 4 : 22 + r() * 5
    pts.push([x + w * 0.45, top])
    if ('gjpqyz'.includes(ch)) pts.push([x + w * 0.75, 47 + r() * 2], [x + w * 0.35, 44])
    pts.push([x + w, 33 + r() * 3])
    x += w
  }
  pts.push([x + 9, 22 + r() * 4], [x + 13, 34], [x - 6, 41], [x * 0.4, 43 + r() * 2], [7, 41])
  return pts
}

function smoothPath(p: Pt[]): string {
  const f = (n: number) => String(Math.round(n * 10) / 10)
  let d = 'M' + f(p[0][0]) + ' ' + f(p[0][1])
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]
    const p1 = p[i]
    const p2 = p[i + 1]
    const p3 = p[i + 2] ?? p2
    d +=
      ' C' +
      f(p1[0] + (p2[0] - p0[0]) / 6) +
      ' ' +
      f(p1[1] + (p2[1] - p0[1]) / 6) +
      ' ' +
      f(p2[0] - (p3[0] - p1[0]) / 6) +
      ' ' +
      f(p2[1] - (p3[1] - p1[1]) / 6) +
      ' ' +
      f(p2[0]) +
      ' ' +
      f(p2[1])
  }
  return d
}

export function signatureOf(name: string): { d: string; width: number } {
  const pts = signaturePoints(name)
  const width = Math.ceil(Math.max(...pts.map((p) => p[0])) + 6)
  return { d: smoothPath(pts), width }
}
