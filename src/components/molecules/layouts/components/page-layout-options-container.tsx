import { useRef } from 'react'
import Menu from '../../menu/components/menu'
import PageLayoutOption from './page-layout-option'
import type { MenuOption, MenuRef } from '../../menu/components/menu'
import type { LayoutOption } from '../models/pageLayoutOption'
import { Icon, MoreVertIcon } from '@/components/atoms'
import { useWindowBreakpoint } from '@/hooks/useWindowBreakpoint'
import { SMALL_SCREEN_BREAKPOINT } from '@/lib/utils'

export type PageLayoutOptionsContainerProps = {
  options: Array<LayoutOption>
  smallScreenExtraMenuOptions?: Array<MenuOption>
}

const PageLayoutOptionsContainer = ({
  smallScreenExtraMenuOptions,
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
        <PageLayoutOptionsMenu
          options={options}
          smallScreenExtraMenuOptions={smallScreenExtraMenuOptions}
        />
      </div>
    </>
  )
}

const PageLayoutOptionsMenu = ({
  options,
  smallScreenExtraMenuOptions,
}: {
  options: Array<LayoutOption>
  smallScreenExtraMenuOptions?: Array<MenuOption>
}) => {
  const isMobile = useWindowBreakpoint(SMALL_SCREEN_BREAKPOINT)
  const menuRef = useRef<MenuRef>(null)

  return (
    <>
      <Icon
        className="text-secondary"
        onClick={(e) => menuRef.current?.open(e)}
        icon={MoreVertIcon}
      />
      {isMobile && (
        <Menu
          ref={menuRef}
          options={options
            .map(
              (el) =>
                ({
                  ...el,
                  label: el.title ?? '',
                  icon: undefined,
                }) as MenuOption,
            )
            .concat(smallScreenExtraMenuOptions ?? [])}
        />
      )}
    </>
  )
}

export default PageLayoutOptionsContainer
