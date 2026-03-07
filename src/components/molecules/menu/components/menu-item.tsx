import { MenuItemProps, MenuItem as MMenuItem } from '@mui/material'

const MenuItem = ({ children, ...props }: MenuItemProps) => {
  return (
    <MMenuItem className="text-secondary" {...props}>
      {children}
    </MMenuItem>
  )
}

export default MenuItem
