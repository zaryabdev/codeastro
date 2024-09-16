interface Entry {
  data: {
    date: string
  }
}

export function byEntryDate(a: Entry, b: Entry) {
  return (
    (new Date(b.data.date) as unknown as number) -
    (new Date(a.data.date) as unknown as number)
  )
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function formatPostDate(isoString: string) {
  const [date] = isoString.split('T')
  const [year, month, day] = date.split('-')

  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`
}

export function slugify(str: string) {
  return str.toLowerCase().split(' ').filter(Boolean).join('-')
}
