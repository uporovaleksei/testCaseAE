const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export function parseRuDate(dateStr: string): Date | null {
  const parts = dateStr.trim().split(' ')
  if (parts.length !== 3) return null

  const day = Number(parts[0])
  const month = monthNames.indexOf(parts[1].toLowerCase())
  const year = Number(parts[2])

  if (day && month >= 0 && year) {
    return new Date(year, month, day)
  }

  return null
}

export function formatCurrentDate(): string {
  const d = new Date()
  const day = d.getDate().toString().padStart(2, '0')
  const month = monthNames[d.getMonth()]
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}
