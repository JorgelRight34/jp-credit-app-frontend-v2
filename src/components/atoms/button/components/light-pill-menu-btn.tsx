import { useRef } from 'react'
import { ArrowDropDownCircleIcon, Icon } from '../../icon'
import { LightBtnProps } from './light-btn'
import Menu, {
  MenuOption,
  MenuRef,
} from '@/components/molecules/menu/components/menu'
import LightPillBtn from './light-pill-btn'

interface LightPillMenuBtnProps extends LightBtnProps {
  options: Array<MenuOption>
}

const LightPillMenuBtn = ({
  options,
  children,
  ...props
}: LightPillMenuBtnProps) => {
  const menuRef = useRef<MenuRef>(null)

  return (
    <span>
      <LightPillBtn {...props} onClick={(e) => menuRef.current?.open(e)}>
        <Icon icon={ArrowDropDownCircleIcon}>{children}</Icon>
      </LightPillBtn>
      <Menu ref={menuRef} options={options} />
    </span>
  )
}

export default LightPillMenuBtn
