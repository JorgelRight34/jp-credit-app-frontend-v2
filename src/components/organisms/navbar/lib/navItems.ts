import type { NavItem } from "../models/navItem";
import { AccountBalanceIcon, AccountBalanceWalletIcon, AddIcon, ApartmentIcon, ArrowCircleDownIcon, ArrowCircleUpIcon, AssignmentIcon, AttachMoneyIcon, BadgeIcon, CheckCircleIcon, CreditCardIcon, DirectionsCarIcon, ErrorIcon, FolderOpenIcon, GrassIcon, GroupIcon, GroupsIcon, HomeStorageIcon, ListAltIcon, LockIcon, MailIcon, PaymentIcon, PersonAddIcon, PersonIcon, PlayCircleIcon, PublicIcon, QueryStatsIcon, ReceiptLongIcon, SettingsIcon, StickyNote2Icon, TrendingUpIcon } from "@/components/atoms";

const addRouteBase: NavItem = {
  name: "Añadir",
  icon: AddIcon,
  route: "."
}

const allRouteBase: NavItem = {
  name: "Todos",
  icon: PublicIcon,
  route: "."
}

export const accountStatusNavItem: NavItem = {
  name: "Estados de Cuenta",
  icon: AccountBalanceIcon,
  route: "account-statements",
  children: [
    {
      name: "General",
      icon: GroupIcon,
      route: "account-statements/all",
    },
    {
      name: "Cliente",
      icon: GroupsIcon,
      route: "account-statements/client",
    },
    {
      name: "Garante",
      icon: GroupsIcon,
      route: "account-statements/guarantor",
    },
  ],
};

export const accessControlNavItem: NavItem = {
  name: "Control Acceso",
  icon: LockIcon,
  route: "access-control",
  children: [
    {
      ...allRouteBase,
      route: "access-control"
    },
    {
      name: "Administradores",
      icon: GroupIcon,
      route: "access-control/admins",
    },
    {
      name: "Usuarios",
      icon: GroupsIcon,
      route: "access-control/users",
    },
    {
      ...addRouteBase,
      route: "access-control/create"
    }
  ],
};

export const profileNavItem: NavItem = {
  name: "Pérfiles",
  icon: PersonIcon,
  route: "profiles",
  children: [
    {
      ...allRouteBase,
      route: PersonIcon
    },
    {
      name: "Clientes",
      icon: GroupsIcon,
      route: "profiles/clients",
    },
    {
      name: "Garantes",
      icon: PersonAddIcon,
      route: "profiles/guarantors",
    },
    {
      name: "Agentes",
      icon: BadgeIcon,
      route: "profiles/loanOfficers",
    },
    {
      ...addRouteBase,
      route: "profiles/create",
    },
  ],
};

export const collateralsNavItem: NavItem = {
  name: "Garantías",
  icon: FolderOpenIcon,
  route: "collaterals",
  children: [
    {
      ...allRouteBase,
      route: "collaterals"
    },
    {
      name: "Vehículos",
      icon: DirectionsCarIcon,
      route: "collaterals/vehicles",
    },
    {
      name: "Hipotecas",
      icon: ApartmentIcon,
      route: "collaterals/mobiliary",
    },
    {
      name: "Agrícola",
      icon: GrassIcon,
      route: "collaterals/farm",
    },
    {
      name: "Liquidados",
      icon: ReceiptLongIcon,
      route: "collaterals/collateralizations",
    },
    {
      ...addRouteBase,
      route: "collaterals/create"
    }
  ],
};

export const transactionsNavItem: NavItem = {
  name: "Transacciones",
  icon: CreditCardIcon,
  route: "transactions",
  children: [
    {
      ...allRouteBase,
      route: "transactions"
    },
    {
      name: "Ingresos",
      icon: AttachMoneyIcon,
      route: "transactions/incomes",
    },
    {
      name: "Egresos",
      icon: PaymentIcon,
      route: "transactions/expenses",
    },
    {
      name: "Atrasos",
      icon: ErrorIcon,
      route: "transactions/overdue-payments",
    },
    {
      ...addRouteBase,
      route: "transactions/create"
    }
  ],
};

export const projectsNavItem: NavItem = {
  name: "Proyectos",
  icon: FolderOpenIcon,
  route: "projects",
};

export const loansNavItem: NavItem = {
  name: "Préstamos",
  icon: MailIcon,
  route: "loans",
  children: [
    {
      ...allRouteBase,
      route: "loans"
    },
    {
      name: "Activos",
      icon: PlayCircleIcon,
      route: "loans/active",
    },
    {
      name: "Saldados",
      icon: CheckCircleIcon,
      route: "loans/paid-off",
    },
    {
      name: "Atrasados",
      icon: ErrorIcon,
      route: "loans/overdue",
    },
    {
      name: "Añadir",
      icon: AddIcon,
      route: "loans/create"
    }
  ],
};

export const notesNavItem: NavItem = {
  name: "Notas",
  icon: StickyNote2Icon,
  route: "adjustment-notes",
  children: [
    {
      ...allRouteBase,
      route: "adjustment-notes"
    },
    {
      name: "Crédito",
      icon: ArrowCircleUpIcon,
      route: "adjustment-notes/credit",
    },
    {
      name: "Débito",
      icon: ArrowCircleDownIcon,
      route: "adjustment-notes/debit",
    },
    {
      ...addRouteBase,
      route: "adjustment-notes/create"
    }
  ],
};

export const armotizationsNavItem: NavItem = {
  name: "Armotizaciones",
  icon: ListAltIcon,
  route: "armotizations",
};

export const followUpsNavItem: NavItem = {
  name: "Seguimientos",
  icon: AssignmentIcon,
  route: "follow-ups",
  children: [
    {
      ...allRouteBase,
      route: "follow-ups"
    },
    {
      ...addRouteBase,
      route: "follow-ups/create"
    }]
};

export const reportsNavItem: NavItem = {
  name: "Reportes",
  icon: HomeStorageIcon,
  route: "reports",
  children: [
    {
      ...allRouteBase,
      route: "reports"
    },
    {
      name: "Garantías",
      icon: collateralsNavItem.icon,
      route: "reports/collaterals",
    },
    {
      name: "Préstamos",
      icon: loansNavItem.icon,
      route: "reports/loans",
    },
    {
      name: "Pérfiles",
      icon: profileNavItem.icon,
      route: "reports/profiles",
    },
    {
      name: "Transacciones",
      icon: transactionsNavItem.icon,
      route: "reports/transactions",
    },
    {
      ...addRouteBase,
      route: "reports/create"
    }

  ],
}

export const financesNavItem: NavItem = {
  name: "Finanzas",
  icon: QueryStatsIcon,
  route: "finance",
  children: [
    {
      ...allRouteBase,
      route: "finance"
    },
    {
      name: "Proyecciones",
      icon: TrendingUpIcon,
      route: "finance/projections",
    },
    {
      name: "Ingresos",
      icon: AttachMoneyIcon,
      route: "finance/incomes",
    },
    {
      name: "Egresos",
      icon: AccountBalanceWalletIcon,
      route: "finance/expenses",
    },
  ],
};

export const settingsNavItem: NavItem = {
  name: "Configuraciones",
  icon: SettingsIcon,
  route: "projects/settings",
};

