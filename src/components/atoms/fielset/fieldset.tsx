import { HTMLAttributes } from 'react'

const Fieldset = ({
  className = 'gap-6',
  legend,
  legendClassName = 'px-2',
  children,
}: HTMLAttributes<HTMLFieldSetElement> & {
  legend: string
  legendClassName?: string
}) => {
  return (
    <fieldset
      className={`bg-surface flex w-full flex-col rounded-xl border p-3 px-2 pb-6 md:px-4 ${className}`}
    >
      <legend className={`${legendClassName} text-primary`}>{legend}</legend>
      {children}
    </fieldset>
  )
}

export default Fieldset
