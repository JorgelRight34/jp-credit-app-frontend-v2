import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

const Paragraph = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={clsx('text-secondary font-normal', className)} {...props}>
      {children}
    </p>
  )
}

export default Paragraph
