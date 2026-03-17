import { default as MTooltip } from '@mui/material/Tooltip'
import { PropsWithChildren } from 'react'

interface TooltipProps extends PropsWithChildren<{ title?: string }> {}

const Tooltip = ({ title, children }: TooltipProps) => {
  if (!title) return children

  return (
    <MTooltip title={title}>
      <span style={{ display: 'block' }}>{children}</span>
    </MTooltip>
  )
}

export default Tooltip
