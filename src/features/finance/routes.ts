import { lazy } from "react";
import { Routes } from "../../models/route"

const FinancesPage = lazy(() => import("./pages/FinancesPage"))


const financeRoutes: Routes = [
    {
        path: "",
        component: FinancesPage,
        children: [
            { path: "projections", breadcrumb: { title: "Proyecciones", icon: "rocket_launch" } },
            { path: "incomes", breadcrumb: { title: "Ingresos", icon: "credit_card" } },
            { path: "expenses", breadcrumb: { title: "Egresos", icon: "mail" } }
        ]
    }
]

export default financeRoutes