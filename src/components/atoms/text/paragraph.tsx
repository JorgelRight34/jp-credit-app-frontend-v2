import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

const Paragraph = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={clsx('text-gray-500 font-normal', className)} {...props}>
      {children}
    </p>
  )
}

export default Paragraph
