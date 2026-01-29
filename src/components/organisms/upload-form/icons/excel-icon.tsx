import type { FileIconProps } from '../models/fileIconProps'

const ExcelIcon = ({ className, color }: FileIconProps) => {
  return (
    <svg
      className={`w-5 h-5 text-green-600 mr-3 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        color={color}
        strokeWidth={2}
        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

export default ExcelIcon
