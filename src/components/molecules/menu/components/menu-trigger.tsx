import { useRef } from 'react'
import { MenuRef } from './menu'

export const useMenu = () => {
  const menuRef = useRef<MenuRef>(null)

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const menu = menuRef.current
    if (menu?.isOpen) {
      menu.close()
    } else {
      menu?.open(event)
    }
  }

  return { menuRef, toggle }
}
