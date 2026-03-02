import {
  BarChartIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  FinanceIcon,
  TableRowsIcon,
} from '@/components'

export const financeBreadcrumb: BreadcrumbSpec = {
  icon: FinanceIcon,
  title: 'Finanzas',
}

export const financeSectionBreadcrumbsByRoute: BreadcrumbsByRoute = {
  table: [{ title: 'Tabla', icon: TableRowsIcon }],
  chart: [{ title: 'Grafica', icon: BarChartIcon }],
}
