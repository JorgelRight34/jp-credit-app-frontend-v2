import type { BreadcrumbSpec } from '../models/breadcrumb'
import { OverviewIcon, SettingsIcon } from '@/components/atoms'

export const overviewBreadcrumb: BreadcrumbSpec = {
  title: 'Overview',
  icon: () => <OverviewIcon />,
}

export const settingsBreadcrumb: BreadcrumbSpec = {
  title: 'Ajustes',
  icon: () => <SettingsIcon />,
}
