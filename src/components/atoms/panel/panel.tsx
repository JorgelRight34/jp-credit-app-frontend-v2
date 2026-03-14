import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const Panel = ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx('bg-background fade-in flex-1 border-t pt-3', className)}
    >
      {children}
    </div>
  )
}

export default Panel
