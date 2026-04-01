import type { NavItem } from '../models/navItem'
import {
  AccountBalanceWalletIcon,
  AccountStatementsIcon,
  AddIcon,
  AdjustmentNoteIcon,
  AdminPanelSettingsIcon,
  ApartmentIcon,
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  AssignmentIcon,
  AttachMoneyIcon,
  BadgeIcon,
  CheckCircleIcon,
  CollateralIcon,
  CreditCardIcon,
  DirectionsCarIcon,
  ErrorIcon,
  FlagIcon,
  GrassIcon,
  GroupIcon,
  GroupsIcon,
  InventoryIcon,
  ListAltIcon,
  LockIcon,
  MailIcon,
  PaymentIcon,
  PersonAddIcon,
  PersonIcon,
  PlayCircleIcon,
  PrintIcon,
  ProjectIcon,
  PublicIcon,
  QueryStatsIcon,
  ReportIcon,
  ScheduleIcon,
  SettingsIcon,
  TrendingUpIcon,
} from '@/components/atoms'

const addRouteName = 'Añadir'
const addRouteIcon = () => <AddIcon />

const allRouteBase: NavItem = {
  name: 'Todos',
  icon: () => <PublicIcon />,
  route: '.',
}

export const accountStatusNavItem: NavItem = {
  name: 'Estados de Cuenta',
  icon: () => <AccountStatementsIcon />,
  route: '/account-statements',
  children: [
    {
      name: 'General',
      icon: () => <GroupIcon />,
      route: '/account-statements',
      search: { tab: 0 },
    },
    {
      name: 'Cliente',
      icon: () => <GroupsIcon />,
      route: '/account-statements',
      search: { tab: 1 },
    },
    {
      name: 'Garante',
      icon: () => <GroupsIcon />,
      route: '/account-statements',
      search: { tab: 2 },
    },
  ],
}

export const accessControlNavItem: NavItem = {
  name: 'Accesos',
  icon: () => <LockIcon />,
  route: '/access-control',
  children: [
    {
      name: 'Usuarios',
      icon: () => <GroupsIcon />,
      route: '/access-control',
      search: { tab: 0 },
    },
    {
      name: 'Roles',
      icon: () => <AdminPanelSettingsIcon />,
      route: '/access-control',
      search: { tab: 1 },
    },
    {
      icon: addRouteIcon,
      name: 'Añadir acceso',
      route: '/access-control/users/create',
    },
    {
      icon: addRouteIcon,
      name: 'Añadir grupo',
      route: '/access-control/roles/create',
    },
  ],
}

export const profileNavItem: NavItem = {
  name: 'Pérfiles',
  icon: () => <PersonIcon />,
  route: '/profiles',
  children: [
    {
      ...allRouteBase,
      route: '/profiles',
      search: { tab: 0 },
    },
    {
      name: 'Clientes',
      icon: () => <GroupsIcon />,
      route: '/profiles',
      search: { tab: 1 },
    },
    {
      name: 'Garantes',
      icon: () => <PersonAddIcon />,
      route: '/profiles',
      search: { tab: 2 },
    },
    {
      name: 'Agentes',
      icon: () => <BadgeIcon />,
      route: '/profiles',
      search: { tab: '3' },
    },
    {
      name: addRouteName,
      icon: addRouteIcon,
      route: '/profiles/create',
    },
  ],
}

export const collateralsNavItem: NavItem = {
  name: 'Garantías',
  icon: () => <CollateralIcon />,
  route: '/collaterals',
  children: [
    {
      ...allRouteBase,
      route: '/collaterals',
    },
    {
      name: 'Vehículos',
      icon: () => <DirectionsCarIcon />,
      route: '/collaterals',
      search: { tab: 0 },
    },
    {
      name: 'Hipotecas',
      icon: () => <ApartmentIcon />,
      route: '/collaterals',
      search: { tab: 1 },
    },
    {
      name: 'Agrícola',
      icon: () => <GrassIcon />,
      route: '/collaterals',
      search: { tab: 2 },
    },
    {
      name: 'Inventario',
      icon: () => <InventoryIcon />,
      route: '/collaterals',
      search: { tab: '3' },
    },
    {
      name: addRouteName,
      icon: addRouteIcon,
      route: '/collaterals/create',
    },
  ],
}

export const transactionsNavItem: NavItem = {
  name: 'Transacciones',
  icon: () => <CreditCardIcon />,
  route: '/transactions',
  children: [
    {
      ...allRouteBase,
      route: '/transactions',
      search: { tab: 0 },
    },
    {
      name: 'Ingresos',
      icon: () => <AttachMoneyIcon />,
      route: '/transactions',
      search: { tab: 1 },
    },
    {
      name: 'Egresos',
      icon: () => <PaymentIcon />,
      route: '/transactions',
      search: { tab: 2 },
    },
    {
      name: 'Atrasos',
      icon: () => <ErrorIcon />,
      route: '/transactions',
      search: { tab: 3 },
    },
    {
      name: 'Periodos contables',
      icon: () => <ScheduleIcon />,
      route: '/transactions/periods',
    },
    {
      icon: addRouteIcon,
      name: 'Pagar',
      route: '/transactions/create',
      search: { tab: 0 },
    },
    {
      icon: addRouteIcon,
      name: 'Desembolsar',
      route: '/transactions/create',
      search: { tab: 1 },
    },
  ],
}

export const projectsNavItem: NavItem = {
  name: 'Proyectos',
  icon: () => <ProjectIcon />,
  route: '.',
  children: [
    {
      name: 'Configuraciones',
      icon: () => <SettingsIcon />,
      route: '/projects/settings',
    },
    {
      name: addRouteName,
      icon: addRouteIcon,
      route: '/projects/create',
    },
  ],
}

export const loansNavItem: NavItem = {
  name: 'Préstamos',
  icon: () => <MailIcon />,
  route: '/loans',
  children: [
    {
      ...allRouteBase,
      route: '/loans',
      search: { tab: 0 },
    },
    {
      name: 'Activos',
      icon: () => <PlayCircleIcon />,
      route: '/loans',
      search: { tab: 0 },
    },
    {
      name: 'Inactivos',
      icon: () => <CheckCircleIcon />,
      route: '/loans',
      search: { tab: 1 },
    },
    {
      name: 'Saldados',
      icon: () => <ErrorIcon />,
      route: '/loans',
      search: { tab: 2 },
    },
    {
      name: 'Destinos',
      icon: () => <FlagIcon />,
      route: '/loans/purpouses',
    },
    {
      name: addRouteName,
      icon: addRouteIcon,
      route: '/loans/create',
    },
    {
      name: 'Añadir destino',
      icon: addRouteIcon,
      route: '/loans/purpouses/create',
    },
  ],
}

export const notesNavItem: NavItem = {
  name: 'Notas',
  icon: () => <AdjustmentNoteIcon />,
  route: '/adjustment-notes',
  children: [
    {
      ...allRouteBase,
      route: '/adjustment-notes',
    },
    {
      name: 'Crédito',
      icon: () => <ArrowCircleUpIcon />,
      route: '/adjustment-notes',
      search: { tab: 0 },
    },
    {
      name: 'Débito',
      icon: () => <ArrowCircleDownIcon />,
      route: '/adjustment-notes',
      search: { tab: 1 },
    },
    {
      name: addRouteName,
      icon: addRouteIcon,
      route: '/adjustment-notes/create',
    },
  ],
}

export const armotizationsNavItem: NavItem = {
  name: 'Amortizaciones',
  icon: () => <ListAltIcon />,
  route: '/amortizations',
}

export const followUpsNavItem: NavItem = {
  name: 'Seguimientos',
  icon: () => <AssignmentIcon />,
  route: '/follow-ups',
  children: [
    {
      ...allRouteBase,
      route: '/follow-ups',
    },
    {
      name: addRouteName,
      icon: addRouteIcon,
      route: '/follow-ups/create',
    },
  ],
}

export const reportsNavItem: NavItem = {
  name: 'Reportes',
  icon: () => <ReportIcon />,
  route: '/reports',
  children: [
    {
      ...allRouteBase,
      route: '/reports',
    },
    {
      name: 'Generar',
      icon: () => <PrintIcon />,
      route: '/reports/generate',
    },
    {
      name: addRouteName,
      icon: addRouteIcon,
      route: '/reports/create',
    },
  ],
}

export const financesNavItem: NavItem = {
  name: 'Finanzas',
  icon: () => <QueryStatsIcon />,
  route: '/finance/projections',
  children: [
    {
      name: 'Proyecciones',
      icon: () => <TrendingUpIcon />,
      route: '/finance/projections',
    },
    {
      name: 'Ingresos',
      icon: () => <AttachMoneyIcon />,
      route: '/finance/incomes',
    },
    {
      name: 'Egresos',
      icon: () => <AccountBalanceWalletIcon />,
      route: '/finance/expenses',
    },
  ],
}
