import { IconButton, InputAdornment } from '@mui/material'
import type { IconName } from '@/components/atoms/icon/iconName'
import Icon from '@/components/atoms/icon/icon'

export type IconInputSlotProps = {
  iconDirection?: string
  icon?: IconName
  onClick?: () => void
}

export const getIconInputSlot = ({
  icon,
  iconDirection,
  onClick,
}: IconInputSlotProps = {}) => {
  const isDirectionRight = iconDirection === 'right' && icon

  return {
    [isDirectionRight ? 'endAdornment' : 'startAdornment']: icon ? (
      <InputAdornment position={'start'}>
        <IconButton
          onClick={onClick}
          onMouseDown={(e) => e.preventDefault()}
          edge={isDirectionRight ? 'end' : 'start'}
          size="small"
          sx={{
            ml: isDirectionRight ? 1 : 0, // pull closer to the input
            mr: isDirectionRight ? -1 : 0, // reduce spacing on opposite side
          }}
        >
          <Icon icon={icon} />
        </IconButton>
      </InputAdornment>
    ) : undefined,
  }
}
