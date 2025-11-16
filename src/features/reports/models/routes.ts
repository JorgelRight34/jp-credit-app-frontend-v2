import { Routes } from "@/models";
import { lazy } from "react";
import { reportsCacheKey } from "./lib/constants";
import { getReport } from "./services/reportsClient";

const ReportsPage = lazy(() => import("./pages/ReportsPage"))
const ReportPage = lazy(() => import("./pages/ReportPage"))
const ReportsFormPage = lazy(() => import("./pages/ReportsFormPage"))

export const reportRoutes: Routes = [
    {
        path: "", component: ReportsPage, children: [
            { path: "all", index: true, breadcrumb: { title: "Todos", icon: "public" } },
            { path: "loans", breadcrumb: { title: "Préstamos", icon: "mail" } },
            { path: "profiles", breadcrumb: { title: "Pérfiles", icon: "group" } },
            { path: "transactions", breadcrumb: { title: "Transacciones", icon: "credit_card" } },
            { path: "collaterals", breadcrumb: { title: "Garantías", icon: "folder_open" } }
        ],
    },
    { path: "create", component: ReportsFormPage },
    {
        path: ":id", breadcrumb: {
            icon: "draft", loader: {
                callback: (params) => getReport(params.id),
                titleAccessor: (data) => data.title,
                loaderCacheKey: (data) => [...reportsCacheKey, data.id]
            }
        },
        children: [
            { path: "", component: ReportPage },
            { path: "edit", component: ReportsFormPage }
        ]
    }
]