import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

const Paragraph = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={clsx('text-muted font-normal', className)} {...props}>
      {children}
    </p>
  )
}

export default Paragraph
