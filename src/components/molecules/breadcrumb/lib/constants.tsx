import type { BreadcrumbSpec } from '../models/breadcrumb'
import { OverviewIcon, SettingsIcon } from '@/components/atoms'

export const overviewBreadcrumb: BreadcrumbSpec = {
  title: 'Resumen',
  icon: () => <OverviewIcon />,
}

export const settingsBreadcrumb: BreadcrumbSpec = {
  title: 'Ajustes',
  icon: () => <SettingsIcon />,
}
