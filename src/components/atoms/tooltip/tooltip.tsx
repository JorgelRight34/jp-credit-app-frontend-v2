import { default as MTooltip } from '@mui/material/Tooltip'

type TooltipProps = {
  title?: string
  children: React.ReactElement
}

const Tooltip = ({ title, children }: TooltipProps) => {
  if (!title) return children

  return (
    <MTooltip title={title}>
      <span style={{ display: 'block' }}>{children}</span>
    </MTooltip>
  )
}

export default Tooltip
