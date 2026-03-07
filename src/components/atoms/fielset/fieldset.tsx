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
    <fieldset
      className={`border w-full rounded-xl bg-surface p-3 px-4 ${className}`}
    >
      <legend className={`${legendClassName} text-primary`}>{legend}</legend>
      {children}
    </fieldset>
  )
}

export default Fieldset
