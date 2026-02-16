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

export const createPageLayoutCreateOption = (
  createPath: Route,
): LayoutOption => ({
  title: 'Añadir',
  to: createPath,
  icon: AddIcon,
  component: AccentPillBtn,
})

export const createPageLayoutEditOption = (
  editPath: Route,
  params?: RouteParams,
): LayoutOption => ({
  title: 'Editar',
  to: editPath,
  params,
  icon: EditIcon,
  component: AccentPillBtn,
})

export const createPageLayoutMenuOption = (
  options: Array<MenuOption>,
): LayoutOption => ({
  title: 'Opciones',
  component: (props) => LightPillMenuBtn({ ...props, options }),
})

export const createPageLayoutDeleteOption = ({
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

export const createPageLayoutSettingsOption = (
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

export const createPageLayoutSettingsOptionLight = (
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
