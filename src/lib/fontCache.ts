
  const GOOGLE_TTF =
  'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansArabic/NotoSansArabic-Regular.ttf'

let cache: ArrayBuffer | null = null

export async function getArabicFontBytes() {
  if (cache) return cache
  const res = await fetch(GOOGLE_TTF)
  if (!res.ok) throw new Error('font download failed')
  cache = await res.arrayBuffer()
  return cache
}