import { InputAdornment } from '@mui/material'
import type { IconName } from '@/components/atoms/icon/models/iconName'
import Icon from '@/components/atoms/icon/components/icon'

export type IconInputSlotProps = {
  iconDirection?: string
  icon?: IconName
  onClick?: () => void
}

export const getIconInputSlot = ({
  icon,
  iconDirection = 'right',
  onClick,
}: IconInputSlotProps = {}) => {
  const isDirectionRight = iconDirection === 'right' && icon

  return {
    [isDirectionRight ? 'endAdornment' : 'startAdornment']: icon ? (
      <InputAdornment
        className="text-muted"
        position={isDirectionRight ? 'end' : 'start'}
      >
        <Icon wrapperClassName="text-muted" onClick={onClick} icon={icon} />
      </InputAdornment>
    ) : null,
  }
}
