import { lazy } from "react"
import { Routes } from "../../models/route"
import { getLoan } from "./services/loanClient"
import { loansQueryKey } from "./lib/constants"

const LoansPage = lazy(() => import("./pages/LoansPage"))
const LoanPage = lazy(() => import("./pages/LoanPage"))
const LoanFormPage = lazy(() => import("./pages/LoanFormPage"))

const loanRoutes: Routes = [
    {
        path: "",
        component: LoansPage,
        children: [
            { path: "active", breadcrumb: { title: "Activos", icon: "today" } },
            { path: "paid-off", breadcrumb: { title: "Saldados", icon: "history" } },
            { path: "overdue", breadcrumb: { title: "Atrasados", icon: "assignment_late" } },
        ]
    },
    {
        path: "create/:tab?",
        component: LoanFormPage
    },
    {
        path: ":id",
        breadcrumb: {
            loader: {
                callback: async (params) => { await getLoan(params.id) },
                titleAccessor: (data) => `Préstamo #${data.id}`,
                loaderCacheKey: (data) => [...loansQueryKey, Number(data.id)]
            }, icon: "mail",
        },
        children: [
            {
                path: "", component: LoanPage, children: [
                    { path: "info", index: true, breadcrumb: { title: "Info", icon: "info" } },
                    { path: "collaterals", breadcrumb: { title: "Garantías", icon: "folder_open" }, },
                    { path: "account-statements", breadcrumb: { title: "Estado de Cuenta", icon: "account_balance" } },
                    { path: "notes", breadcrumb: { title: "Notas", icon: "note_stack" } },
                    { path: "follow-ups", breadcrumb: { title: "Seguimientos", icon: "analytics" } },
                    { path: "armotization", breadcrumb: { title: "Armotización", icon: "list" } },
                    { path: "client", breadcrumb: { title: "Cliente", icon: "person" } },
                    { path: "loanOfficer", breadcrumb: { title: "Agente", icon: "person" } },
                    { path: "guarantor", breadcrumb: { title: "Garante", icon: "person" } }
                ]
            },
            { path: "edit", component: LoanFormPage }
        ]
    }
]

export default loanRoutes