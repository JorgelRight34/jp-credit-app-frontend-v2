import { lazy } from "react";
import { Routes } from "../../models/route";

const AmortizationsPage = lazy(
    () => import("./pages/AmortizationsPage")
);

export const armotizationRoutes: Routes = [
    {
        path: "",
        component: AmortizationsPage,
        children: [
            { path: "calculate", breadcrumb: { title: "Calculadora", icon: "calculate" } },
            { path: "loan", breadcrumb: { title: "Préstamo", icon: "mail" } }
        ]
    }
]