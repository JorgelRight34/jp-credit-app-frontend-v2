import type { LayoutOption } from '../models/pageLayoutOption'
import { Icon } from '@/components/atoms'

type PageLayoutOptionProps = {
  option: LayoutOption
}

const PageLayoutOption = ({ option }: PageLayoutOptionProps) => {
  const Component = option.component

  return (
    <Component
      disabled={option.disabled}
      title={option.tooltip}
      onClick={option.onClick}
      to={option.to}
    >
      <Icon icon={option.icon}>{option.title}</Icon>
    </Component>
  )
}

export default PageLayoutOption
