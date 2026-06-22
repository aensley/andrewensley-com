const MONTH_OFFSET = 1

export function formatDate(date: string): string {
  if (date === '') return ''
  // Parse as local date to avoid UTC offset shifting the day
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - MONTH_OFFSET, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
