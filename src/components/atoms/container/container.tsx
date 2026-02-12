import clsx from 'clsx'
import React from 'react'

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>

const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col rounded-xl border bg-white p-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
