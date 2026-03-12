import { HTMLAttributes } from 'react'
import { VariationKey, variations } from '../lib/variations'

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  variation?: VariationKey
}

const TabsList = ({
  variation = 'default',
  className = variations[variation].list,
  children,
}: TabsListProps & { variation?: VariationKey }) => {
  return (
    <nav className={className + ' ' + variations[variation].list}>
      <ul className="flex list-unstyled">{children}</ul>
    </nav>
  )
}

export default TabsList
