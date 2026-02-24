import { TabList as RTabList, TabListProps } from 'react-tabs'
import { VariationKey, variations } from '../lib/variations'

const TabList = ({
  variation = 'default',
  className = variations[variation].list,
  children,
}: TabListProps & { variation?: VariationKey }) => {
  return <RTabList className={className}>{children}</RTabList>
}

export default TabList
