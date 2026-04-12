import { Menu as MuiMenu } from '@mui/material'
import React, { forwardRef, useId, useImperativeHandle, useState } from 'react'
import MenuItem from './menu-item'
import type { MenuProps } from '@mui/material'
import type { IconName } from '@/components/atoms/icon/models/iconName'
import Icon, { IconProps } from '@/components/atoms/icon/components/icon'
import { Link, LinkProps, Tooltip } from '@/components/atoms'

export interface MenuOption {
  title?: string
  disabled?: boolean
  tooltip?: string
  to?: LinkProps['to']
  search?: LinkProps['search']
  params?: LinkProps['params']
  as?: IconProps['as']
  className?: string
  icon?: IconName
  onClick?: () => void
}

export interface MenuRef {
  isOpen: boolean
  close: () => void
  open: (event: React.MouseEvent) => void
}

type MenuRefProps = Omit<MenuProps, 'open'> & {
  options?: Array<MenuOption>
}

const SX = {
  '& .MuiPaper-root': {
    backgroundColor: 'var(--surface)',
    color: 'var(--text-primary)',
    borderColor: 'var(--bs-border-color)',
    border: '1px solid var(--bs-border-color)',
  },
  '& .MuiMenuItem-root:hover': {
    backgroundColor:
      'color-mix(in srgb, var(--primary-color) 10%, transparent)',
  },
}

const Menu = forwardRef<MenuRef, MenuRefProps>(
  ({ options = [], ...props }, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const id = useId()
    const open = Boolean(anchorEl)

    const handleMenuOpen = (event: React.MouseEvent) => {
      setAnchorEl((event as React.MouseEvent<HTMLButtonElement>).currentTarget)
    }

    const handleMenuClose = () => {
      setAnchorEl(null)
    }

    useImperativeHandle(
      ref,
      () => ({
        isOpen: open,
        close: handleMenuClose,
        open: handleMenuOpen,
      }),
      [open, handleMenuClose, handleMenuOpen],
    )

    return (
      <MuiMenu
        {...props}
        anchorEl={anchorEl}
        open={open}
        id={id}
        sx={SX}
        onClose={handleMenuClose}
      >
        {options.map((option, index) => (
          <Tooltip key={index} title={option.tooltip}>
            <MenuItem
              className={option.className}
              onClick={option.onClick}
              disabled={option.disabled}
            >
              <Link
                to={option.to}
                params={option.params}
                search={option.search}
              >
                <Icon icon={option.icon} as={option.as}>
                  {option.title}
                </Icon>
              </Link>
            </MenuItem>
          </Tooltip>
        ))}
      </MuiMenu>
    )
  },
)

Menu.displayName = 'Menu'

export default Menu
