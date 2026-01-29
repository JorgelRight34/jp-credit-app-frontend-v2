import { useRef } from 'react'
import Menu from '../../menu/menu'
import EntityLayoutOption from './entity-layout-option'
import type { MenuRef } from '../../menu/menu'
import type { LayoutOption } from '../models/entityLayoutOption'
import { ArrowDownwardIcon, LightBtn } from '@/components/atoms'

export type EntityLayoutOptionsContainerProps = {
  options: Array<LayoutOption>
}

const EntityLayoutOptionsContainer = ({
  options,
}: EntityLayoutOptionsContainerProps) => {
  return (
    <>
      {/* Options */}
      <div className="hidden items-center gap-3 md:flex">
        {options.map((option, index) => (
          <EntityLayoutOption key={index} option={option} />
        ))}
      </div>
      <div className="ml-auto block md:hidden">
        <EntityLayoutOptionsMenu options={options} />
      </div>
    </>
  )
}

const EntityLayoutOptionsMenu = ({
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

export default EntityLayoutOptionsContainer
