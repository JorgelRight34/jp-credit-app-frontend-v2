import { useRef } from 'react'
import Menu from '../../menu/menu'
import PageLayoutOption from './page-layout-option'
import type { MenuRef } from '../../menu/menu'
import type { LayoutOption } from '../models/pageLayoutOption'
import { ArrowDownwardIcon, LightBtn } from '@/components/atoms'

export type PageLayoutOptionsContainerProps = {
  options: Array<LayoutOption>
}

const PageLayoutOptionsContainer = ({
  options,
}: PageLayoutOptionsContainerProps) => {
  return (
    <>
      <div className="hidden items-center gap-3 md:flex">
        {options.map((option, index) => (
          <PageLayoutOption key={index} option={option} />
        ))}
      </div>
      <div className="ml-auto block md:hidden">
        <PageLayoutOptionsMenu options={options} />
      </div>
    </>
  )
}

const PageLayoutOptionsMenu = ({
  options,
}: {
  options: Array<LayoutOption>
}) => {
  const menuRef = useRef<MenuRef>(null)

  return (
    <>
      <LightBtn
        icon={ArrowDownwardIcon}
        onClick={(e) => menuRef.current?.open(e)}
      >
        Opciones
      </LightBtn>
      <Menu
        ref={menuRef}
        options={options
          .filter((el) => el.show)
          .map((el) => ({ ...el, label: el.title ?? '' }))}
      />
    </>
  )
}

export default PageLayoutOptionsContainer
