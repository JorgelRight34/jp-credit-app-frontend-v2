import type { LayoutOption } from '../models/pageLayoutOption'
import { Icon, Link } from '@/components/atoms'

type EntityLayoutOptionProps = {
  option: LayoutOption
}

const EntityLayoutOption = ({ option }: EntityLayoutOptionProps) => {
  const Component = option.component

  if (option.to) {
    return (
      <Link to={option.to}>
        <Component
          disabled={option.disabled}
          title={option.tooltip}
          onClick={option.onClick}
        >
          <Icon icon={option.icon}>{option.title}</Icon>
        </Component>
      </Link>
    )
  }

  return (
    <Component
      disabled={option.disabled}
      title={option.tooltip}
      onClick={option.onClick}
    >
      <Icon icon={option.icon}>{option.title}</Icon>
    </Component>
  )
}

export default EntityLayoutOption
