import type { NavItem } from '../models/navItem'
import {
  AccountBalanceIcon,
  AccountBalanceWalletIcon,
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
  HomeStorageIcon,
  InventoryIcon,
  ListAltIcon,
  LockIcon,
  MailIcon,
  PaymentIcon,
  PersonAddIcon,
  PersonIcon,
  PlayCircleIcon,
  PublicIcon,
  QueryStatsIcon,
  ScheduleIcon,
  SettingsIcon,
  StickyNote2Icon,
  TrendingUpIcon,
} from '@/components/atoms'

const addRouteBase: NavItem = {
  name: 'Añadir',
  icon: () => <AddIcon />,
  route: '.',
}

const allRouteBase: NavItem = {
  name: 'Todos',
  icon: () => <PublicIcon />,
  route: '.',
}

export const accountStatusNavItem: NavItem = {
  name: 'Estados de Cuenta',
  icon: () => <AccountBalanceIcon />,
  route: '/account-statements',
  children: [
    {
      name: 'General',
      icon: () => <GroupIcon />,
      route: 'account-statements/all',
    },
    {
      name: 'Cliente',
      icon: () => <GroupsIcon />,
      route: 'account-statements/client',
    },
    {
      name: 'Garante',
      icon: () => <GroupsIcon />,
      route: 'account-statements/guarantor',
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
      ...addRouteBase,
      name: 'Añadir acceso',
      route: '/access-control/users/create',
    },
    {
      ...addRouteBase,
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
      ...addRouteBase,
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
      ...addRouteBase,
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
      ...addRouteBase,
      name: 'Pagar',
      route: '/transactions/create',
      search: { tab: 'pay' },
    },
    {
      ...addRouteBase,
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
      route: 'loans',
    },
    {
      name: 'Activos',
      icon: () => <PlayCircleIcon />,
      route: 'loans/active',
    },
    {
      name: 'Saldados',
      icon: () => <CheckCircleIcon />,
      route: 'loans/paid-off',
    },
    {
      name: 'Atrasados',
      icon: () => <ErrorIcon />,
      route: 'loans/overdue',
    },
    {
      name: 'Añadir',
      icon: () => <AddIcon />,
      route: 'loans/create',
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
      ...addRouteBase,
      route: '/adjustment-notes/create',
    },
  ],
}

export const armotizationsNavItem: NavItem = {
  name: 'Armotizaciones',
  icon: () => <ListAltIcon />,
  route: 'armotizations',
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
      ...addRouteBase,
      route: '/follow-ups/create',
    },
  ],
}

export const reportsNavItem: NavItem = {
  name: 'Reportes',
  icon: () => <HomeStorageIcon />,
  route: 'reports',
  children: [
    {
      ...allRouteBase,
      route: 'reports',
    },
    {
      name: 'Garantías',
      icon: collateralsNavItem.icon,
      route: 'reports/collaterals',
    },
    {
      name: 'Préstamos',
      icon: loansNavItem.icon,
      route: 'reports/loans',
    },
    {
      name: 'Pérfiles',
      icon: profileNavItem.icon,
      route: 'reports/profiles',
    },
    {
      name: 'Transacciones',
      icon: transactionsNavItem.icon,
      route: 'reports/transactions',
    },
    {
      ...addRouteBase,
      route: 'reports/create',
    },
  ],
}

export const financesNavItem: NavItem = {
  name: 'Finanzas',
  icon: () => <QueryStatsIcon />,
  route: 'finance',
  children: [
    {
      ...allRouteBase,
      route: 'finance',
    },
    {
      name: 'Proyecciones',
      icon: () => <TrendingUpIcon />,
      route: 'finance/projections',
    },
    {
      name: 'Ingresos',
      icon: () => <AttachMoneyIcon />,
      route: 'finance/incomes',
    },
    {
      name: 'Egresos',
      icon: () => <AccountBalanceWalletIcon />,
      route: 'finance/expenses',
    },
  ],
}
