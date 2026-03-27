import { useRef } from 'react'
import Menu from '../../menu/components/menu'
import PageLayoutOption from './page-layout-option'
import type { MenuOption, MenuRef } from '../../menu/components/menu'
import type { LayoutOption } from '../models/pageLayoutOption'
import { AccentPillBtn, Icon, MoreVertIcon } from '@/components/atoms'
import { SMALL_SCREEN_BREAKPOINT } from '@/lib/utils'
import { VisibleFrom } from '@/components/organisms'

export type PageLayoutOptionsContainerProps = {
  options: Array<LayoutOption>
  smallScreenExtraMenuOptions?: Array<MenuOption>
}

interface PageLayoutMenuProps {
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
        <AccentPillBtn className="invisible">a</AccentPillBtn>
        {options.map((option, index) => (
          <PageLayoutOption key={index} option={option} />
        ))}
      </div>
      <div className="ml-auto block md:hidden">
        <VisibleFrom breakpoint={SMALL_SCREEN_BREAKPOINT}>
          <PageLayoutOptionsMenu
            options={options}
            smallScreenExtraMenuOptions={smallScreenExtraMenuOptions}
          />
        </VisibleFrom>
      </div>
    </>
  )
}

const PageLayoutOptionsMenu = ({
  options,
  smallScreenExtraMenuOptions,
}: PageLayoutMenuProps) => {
  if (options.length + (smallScreenExtraMenuOptions?.length ?? 0) === 0)
    return null

  return (
    <PageLayoutOptionsInner
      options={options}
      smallScreenExtraMenuOptions={smallScreenExtraMenuOptions}
    />
  )
}

const PageLayoutOptionsInner = ({
  options,
  smallScreenExtraMenuOptions,
}: PageLayoutMenuProps) => {
  const menuRef = useRef<MenuRef>(null)

  return (
    <>
      <Icon
        className="text-secondary"
        onClick={(e) => menuRef.current?.open(e)}
        icon={MoreVertIcon}
      />
      {options.length + (smallScreenExtraMenuOptions?.length ?? 0) > 0 && (
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
