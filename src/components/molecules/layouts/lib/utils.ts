import type { Route, RouteParams } from '@/components/atoms'
import type { LayoutOption } from '../models/pageLayoutOption'
import {
  AccentPillBtn,
  AccentPillLinkBtn,
  AddIcon,
  DeleteIcon,
  EditIcon,
  LightPillBtn,
  LightPillLinkBtn,
  SettingsIcon,
  TableChartIcon,
} from '@/components/atoms'
import { MenuOption } from '../../menu/components/menu'
import LightPillMenuBtn from '@/components/atoms/button/components/light-pill-menu-btn'
import { buildConfirmationModalTrigger, BuildConfirmationModalTriggerProps } from '../../menu'

export const buildPageLayoutCreateOption = (
  createPath: Route,
): LayoutOption => ({
  title: 'Añadir',
  to: createPath,
  icon: AddIcon,
  component: AccentPillLinkBtn,
})


export const buildPageLayoutEditOption = (
  editPath: Route,
  params?: RouteParams,
): LayoutOption => ({
  title: 'Editar',
  to: editPath,
  params,
  icon: EditIcon,
  component: AccentPillLinkBtn,
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

export const buildPageLayoutConfirmationModalOption = ({
  disabled,
  tooltip,
  ...options
}: Partial<LayoutOption>, confModalProps: BuildConfirmationModalTriggerProps): LayoutOption => {
  confModalProps.wrapper = AccentPillBtn;

  return {
    title: 'Eliminar',
    icon: DeleteIcon,
    disabled,
    tooltip: disabled ? tooltip : undefined,
    component: buildConfirmationModalTrigger(confModalProps),
    ...options,
  }
}

export const buildPageLayoutSettingsOption = (
  to: Route,
  params?: RouteParams,
) => {
  return {
    title: 'Configurar',
    to,
    params,
    icon: SettingsIcon,
    component: AccentPillLinkBtn,
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
    component: LightPillLinkBtn,
  }
}

export const buildPageLayoutExportToExcel = () => {
  return {
    title: 'Excel',
    icon: TableChartIcon,
    component: LightPillBtn,
  }
}