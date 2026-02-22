import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const Fieldset = ({
  className,
  legend,
  legendClassName = 'px-2',
  children,
}: HTMLAttributes<HTMLFieldSetElement> & {
  legend: string
  legendClassName?: string
}) => {
  return (
    <fieldset className={clsx('border rounded-xl bg-white pb-2', className)}>
      <legend className={legendClassName}>{legend}</legend>
      {children}
    </fieldset>
  )
}

export default Fieldset
