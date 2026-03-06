import clsx from 'clsx'

const Subtitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={clsx('text-muted', className)} {...props}>
      {children}
    </span>
  )
}

export default Subtitle
