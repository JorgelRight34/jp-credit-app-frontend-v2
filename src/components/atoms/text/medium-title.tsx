import clsx from 'clsx'

const MediumTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3 className={clsx('text-secondary mb-0', className)} {...props}>
      {children}
    </h3>
  )
}

export default MediumTitle
