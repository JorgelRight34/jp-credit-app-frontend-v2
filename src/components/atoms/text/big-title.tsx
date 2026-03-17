import clsx from 'clsx'

const BigTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className={clsx('text-primary mb-0 text-xl md:text-2xl', className)}
      {...props}
    >
      {children}
    </h1>
  )
}

export default BigTitle
