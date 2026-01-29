import type { LayoutOption } from '../models/entityLayoutOption'
import { Icon } from '@/components/atoms'

type EntityLayoutOptionProps = {
  option: LayoutOption
}

const EntityLayoutOption = ({ option }: EntityLayoutOptionProps) => {
  const Component = option.component

  return (
    <Component>
      <Icon icon={option.icon}>{option.title}</Icon>
    </Component>
  )
}

export default EntityLayoutOption
