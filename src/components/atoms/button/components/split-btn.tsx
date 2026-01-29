import { useRef } from 'react'
import { ArrowCircleDownIcon, Icon } from '../../icon'
import type { ButtonProps } from './button'
import type { ElementType } from 'react'
import type { MenuOption, MenuRef } from '@/components/molecules/menu/menu'
import { Menu } from '@/components/molecules'

export type SplitBtnProps = ButtonProps & {
  options: Array<MenuOption>
  Button: ElementType<ButtonProps>
}

const SplitBtn = ({
  options,
  Button,
  children,
  onClick,
  ...props
}: SplitBtnProps) => {
  const menuRef = useRef<MenuRef>(null)

  return (
    <span className="flex">
      <Button {...props} className="!py-0 !pr-0">
        <span className="flex items-center !py-0">
          <span className="border-r py-2 pr-3" onClick={onClick}>
            {children}
          </span>
          <button
            className="flex justify-center px-2"
            onClick={(e) => menuRef.current?.open(e)}
          >
            <Icon icon={ArrowCircleDownIcon} />
          </button>
        </span>
      </Button>
      <Menu ref={menuRef} options={options} />
    </span>
  )
}

export default SplitBtn
