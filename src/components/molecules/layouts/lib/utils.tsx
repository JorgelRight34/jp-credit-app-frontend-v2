import type { Route, RouteParams } from '@/components/atoms'
import type { LayoutOption } from '../models/pageLayoutOption'
import {
  AccentPillBtn,
  AddIcon,
  DeleteIcon,
  EditIcon,
  LightPillBtn,
  SettingsIcon,
} from '@/components/atoms'
import { MenuOption } from '../../menu/menu'
import LightPillMenuBtn from '@/components/atoms/button/components/light-pill-menu-btn'

export const buildPageLayoutCreateOption = (
  createPath: Route,
): LayoutOption => ({
  title: 'Añadir',
  to: createPath,
  icon: AddIcon,
  component: AccentPillBtn,
})

export const buildPageLayoutEditOption = (
  editPath: Route,
  params?: RouteParams,
): LayoutOption => ({
  title: 'Editar',
  to: editPath,
  params,
  icon: EditIcon,
  component: AccentPillBtn,
})

export const buildPageLayoutMenuOption = (
  options: Array<MenuOption>,
): LayoutOption => ({
  title: 'Opciones',
  component: (props) => LightPillMenuBtn({ ...props, options }),
})

export const buildPageLayoutDeleteOption = ({
  disabled,
  tooltip,
  ...options
}: Partial<LayoutOption>): LayoutOption => ({
  title: 'Eliminar',
  icon: DeleteIcon,
  disabled,
  tooltip: disabled ? tooltip : undefined,
  component: AccentPillBtn,
  ...options,
})

export const buildPageLayoutSettingsOption = (
  to: Route,
  params?: RouteParams,
) => {
  return {
    title: 'Configurar',
    to,
    params,
    icon: SettingsIcon,
    component: AccentPillBtn,
  }
}

export const buildPageLayoutSettingsOptionLight = (
  to: Route,
  params?: RouteParams,
) => {
  return {
    title: 'Configurar',
    to,
    params,
    icon: SettingsIcon,
    component: LightPillBtn,
  }
}
