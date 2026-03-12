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
  FolderOpenIcon,
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
  PublicIcon,
  QueryStatsIcon,
  ReportIcon,
  ScheduleIcon,
  SettingsIcon,
  TrendingUpIcon,
  UploadIcon,
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
      search: { tab: 'all' },
    },
    {
      name: 'Cliente',
      icon: () => <GroupsIcon />,
      route: '/account-statements',
      search: { tab: 'clients' },
    },
    {
      name: 'Garante',
      icon: () => <GroupsIcon />,
      route: '/account-statements',
      search: { tab: 'guarantors' },
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
      search: { tab: 'users' },
    },
    {
      name: 'Roles',
      icon: () => <AdminPanelSettingsIcon />,
      route: '/access-control',
      search: { tab: 'roles' },
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
      search: { tab: 'all' },
    },
    {
      name: 'Clientes',
      icon: () => <GroupsIcon />,
      route: '/profiles',
      search: { tab: 'clients' },
    },
    {
      name: 'Garantes',
      icon: () => <PersonAddIcon />,
      route: '/profiles',
      search: { tab: 'guarantors' },
    },
    {
      name: 'Agentes',
      icon: () => <BadgeIcon />,
      route: '/profiles',
      search: { tab: 'loan-officers' },
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
      search: { tab: 'vehicles' },
    },
    {
      name: 'Hipotecas',
      icon: () => <ApartmentIcon />,
      route: '/collaterals',
      search: { tab: 'mortgage' },
    },
    {
      name: 'Agrícola',
      icon: () => <GrassIcon />,
      route: '/collaterals',
      search: { tab: 'agriculturalLoan' },
    },
    {
      name: 'Inventario',
      icon: () => <InventoryIcon />,
      route: '/collaterals',
      search: { tab: 'inventory' },
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
      search: { tab: 'all' },
    },
    {
      name: 'Ingresos',
      icon: () => <AttachMoneyIcon />,
      route: '/transactions',
      search: { tab: 'payments' },
    },
    {
      name: 'Egresos',
      icon: () => <PaymentIcon />,
      route: '/transactions',
      search: { tab: 'disbursements' },
    },
    {
      name: 'Atrasos',
      icon: () => <ErrorIcon />,
      route: '/transactions',
      search: { tab: 'overdue' },
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
      search: { tab: 'pay' },
    },
    {
      icon: addRouteIcon,
      name: 'Desembolsar',
      route: '/transactions/create',
      search: { tab: 'disburse' },
    },
  ],
}

export const projectsNavItem: NavItem = {
  name: 'Proyectos',
  icon: () => <FolderOpenIcon />,
  route: '/projects',
  children: [
    {
      ...allRouteBase,
      route: '/projects',
      search: { tab: 'all' },
    },
    {
      name: 'Configuraciones',
      icon: () => <SettingsIcon />,
      route: '/projects/settings',
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
      search: { tab: 'all' },
    },
    {
      name: 'Activos',
      icon: () => <PlayCircleIcon />,
      route: '/loans',
      search: { tab: 'active' },
    },
    {
      name: 'Inactivos',
      icon: () => <CheckCircleIcon />,
      route: '/loans',
      search: { tab: 'inactive' },
    },
    {
      name: 'Saldados',
      icon: () => <ErrorIcon />,
      route: '/loans',
      search: { tab: 'paidOff' },
    },
    {
      name: addRouteName,
      icon: addRouteIcon,
      route: '/loans/create',
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
      search: { tab: 'nc' },
    },
    {
      name: 'Débito',
      icon: () => <ArrowCircleDownIcon />,
      route: '/adjustment-notes',
      search: { tab: 'nd' },
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
      name: 'Archivos',
      icon: () => <UploadIcon />,
      route: '/reports',
      search: { tab: 'uploads' },
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
