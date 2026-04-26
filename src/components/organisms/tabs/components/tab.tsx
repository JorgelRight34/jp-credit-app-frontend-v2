import clsx from 'clsx'
import type { PropsWithChildren } from 'react'
import { VariationKey, variations } from '../lib/variations'
import { useTabsActiveIndex } from '../providers/tabs-provider'

export interface TabProps extends PropsWithChildren {
  eventKey?: string
  index: number
  className?: string
  variation?: VariationKey
}

const Tab = ({
  variation = 'default',
  eventKey,
  index,
  className,
  children,
  ...props
}: TabProps) => {
  const [activeIndex, setIndex] = useTabsActiveIndex()

  return (
    <li
      {...props}
      className={clsx(
        variations[variation].tab,
        'text-secondary w-fit cursor-pointer focus-visible:outline-none',
        index == activeIndex &&
          'border-secondary-color text-accent-secondary border-b',
        className,
      )}
      onClick={() => setIndex(index)}
    >
      {children}
    </li>
  )
}

export default Tab
