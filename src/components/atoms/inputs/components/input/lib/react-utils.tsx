import { InputAdornment } from '@mui/material'
import type { IconName } from '@/components/atoms/icon/models/iconName'
import Icon from '@/components/atoms/icon/components/icon'
import clsx from 'clsx'

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
        <Icon
          wrapperClassName={clsx('text-muted', onClick && 'cursor-pointer')}
          onClick={onClick}
          icon={icon}
        />
      </InputAdornment>
    ) : null,
  }
}
