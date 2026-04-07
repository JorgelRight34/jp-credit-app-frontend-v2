import type { LayoutOption } from '../models/pageLayoutOption'
import { Icon, Tooltip } from '@/components/atoms'

type PageLayoutOptionProps = {
  option: LayoutOption
}

const PageLayoutOption = ({ option }: PageLayoutOptionProps) => {
  const Component = option.component

  return (
    <Tooltip title={option.tooltip}>
      <Component
        disabled={option.disabled}
        onClick={option.onClick}
        to={option.to}
      >
        <Icon icon={option.icon}>{option.title}</Icon>
      </Component>
    </Tooltip>
  )
}

export default PageLayoutOption
