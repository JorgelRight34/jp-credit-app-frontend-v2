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
        'w-fit cursor-pointer focus-visible:outline-none text-secondary',
        className,
        {
          'border-b border-secondary-color text-accent-secondary':
            index == activeIndex,
        },
      )}
      onClick={() => setIndex(index)}
    >
      {children}
    </li>
  )
}

export default Tab
