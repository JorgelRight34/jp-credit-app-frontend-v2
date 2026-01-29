import { getFullDateString, toFormattedDate } from '@/lib/utils'
import { nullFieldLabel } from '@/lib/utils/constants'

interface DataLabelProps {
  date?: string | Date
}

const DateLabel = ({ date }: DataLabelProps) => {
  const title = getFullDateString(date)

  return (
    <span className="cursor-pointer" title={title} data-title={title}>
      {date ? toFormattedDate(date) : nullFieldLabel}
    </span>
  )
}

export default DateLabel
