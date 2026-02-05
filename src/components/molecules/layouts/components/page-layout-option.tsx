import type { LayoutOption } from '../models/pageLayoutOption'
import { Icon, Link } from '@/components/atoms'

type EntityLayoutOptionProps = {
  option: LayoutOption
}

const EntityLayoutOption = ({ option }: EntityLayoutOptionProps) => {
  const Component = option.component

  return (
    <Link to={option.to ?? '.'}>
      <Component>
        <Icon icon={option.icon}>{option.title}</Icon>
      </Component>
    </Link>
  )
}

export default EntityLayoutOption
