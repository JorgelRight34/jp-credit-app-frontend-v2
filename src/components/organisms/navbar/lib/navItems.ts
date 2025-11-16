import { NavItem } from "../models/navItem";

const addRouteBase: NavItem = {
  name: "Añadir",
  icon: "add",
  route: ""
}

const allRouteBase: NavItem = {
  name: "Todos",
  icon: "public",
  route: ""
}

export const accountStatusNavItem: NavItem = {
  name: "Estados de Cuenta",
  icon: "account_balance",
  route: "account-statements",
  children: [
    {
      name: "General",
      icon: "group",
      route: "account-statements/all",
    },
    {
      name: "Cliente",
      icon: "groups",
      route: "account-statements/client",
    },
    {
      name: "Garante",
      icon: "groups",
      route: "account-statements/guarantor",
    },
  ],
};

export const accessControlNavItem: NavItem = {
  name: "Control Acceso",
  icon: "lock",
  route: "access-control",
  children: [
    {
      ...allRouteBase,
      route: "access-control"
    },
    {
      name: "Administradores",
      icon: "group",
      route: "access-control/admins",
    },
    {
      name: "Usuarios",
      icon: "groups",
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
  icon: "person",
  route: "profiles",
  children: [
    {
      ...allRouteBase,
      route: "person"
    },
    {
      name: "Clientes",
      icon: "groups",
      route: "profiles/clients",
    },
    {
      name: "Garantes",
      icon: "person_add",
      route: "profiles/guarantors",
    },
    {
      name: "Agentes",
      icon: "badge",
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
  icon: "folder_open",
  route: "collaterals",
  children: [
    {
      ...allRouteBase,
      route: "collaterals"
    },
    {
      name: "Vehículos",
      icon: "directions_car",
      route: "collaterals/vehicles",
    },
    {
      name: "Hipotecas",
      icon: "apartment",
      route: "collaterals/mobiliary",
    },
    {
      name: "Agrícola",
      icon: "grass",
      route: "collaterals/farm",
    },
    {
      name: "Liquidados",
      icon: "receipt_long",
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
  icon: "credit_card",
  route: "transactions",
  children: [
    {
      ...allRouteBase,
      route: "transactions"
    },
    {
      name: "Ingresos",
      icon: "attach_money",
      route: "transactions/incomes",
    },
    {
      name: "Egresos",
      icon: "payment",
      route: "transactions/expenses",
    },
    {
      name: "Atrasos",
      icon: "error",
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
  icon: "folder_open",
  route: "projects",
};

export const loansNavItem: NavItem = {
  name: "Préstamos",
  icon: "mail",
  route: "loans",
  children: [
    {
      ...allRouteBase,
      route: "loans"
    },
    {
      name: "Activos",
      icon: "play_circle",
      route: "loans/active",
    },
    {
      name: "Saldados",
      icon: "check_circle",
      route: "loans/paid-off",
    },
    {
      name: "Atrasados",
      icon: "error",
      route: "loans/overdue",
    },
    {
      name: "Añadir",
      icon: "add",
      route: "loans/create"
    }
  ],
};

export const notesNavItem: NavItem = {
  name: "Notas",
  icon: "sticky_note_2",
  route: "adjustment-notes",
  children: [
    {
      ...allRouteBase,
      route: "adjustment-notes"
    },
    {
      name: "Crédito",
      icon: "arrow_circle_up",
      route: "adjustment-notes/credit",
    },
    {
      name: "Débito",
      icon: "arrow_circle_down",
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
  icon: "list_alt",
  route: "armotizations",
};

export const followUpsNavItem: NavItem = {
  name: "Seguimientos",
  icon: "assignment",
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
  icon: "home_storage",
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
  icon: "query_stats",
  route: "finance",
  children: [
    {
      ...allRouteBase,
      route: "finance"
    },
    {
      name: "Proyecciones",
      icon: "trending_up",
      route: "finance/projections",
    },
    {
      name: "Ingresos",
      icon: "attach_money",
      route: "finance/incomes",
    },
    {
      name: "Egresos",
      icon: "account_balance_wallet",
      route: "finance/expenses",
    },
  ],
};

export const settingsNavItem: NavItem = {
  name: "Configuraciones",
  icon: "settings",
  route: "projects/settings",
};

