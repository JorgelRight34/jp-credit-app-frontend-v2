import { PropsWithChildren } from 'react'

const Chip = ({ children }: PropsWithChildren) => {
  return (
    <span
      className="font-mono text-xs bg-gray-100 px-1 rounded-xl"
      style={{ color: 'var(--badge-text-color)' }}
    >
      {children}
    </span>
  )
}

export default Chip
