import { MenuItemProps, MenuItem as MMenuItem } from '@mui/material'

const SX = {
  color: 'var(--text-secondary)',
}

const MenuItem = ({ children, ...props }: MenuItemProps) => {
  return (
    <MMenuItem {...props} sx={SX}>
      {children}
    </MMenuItem>
  )
}

export default MenuItem
