import { getFullDateString, toFormattedDate } from '@/lib/utils'

interface DataLabelProps {
  date?: string | Date
}

const DateLabel = ({ date }: DataLabelProps) => {
  const title = getFullDateString(date)

  return (
    <span className="cursor-pointer" title={title} data-title={title}>
      {date ? toFormattedDate(date) : '---'}
    </span>
  )
}

export default DateLabel
