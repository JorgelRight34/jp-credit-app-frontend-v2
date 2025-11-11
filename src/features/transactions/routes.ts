import { lazy } from "react"
import { Routes } from "../../models/route"
import { getTransaction } from "./services/transactionsClient"
import { transactionsCacheKey } from "./lib/constants"

const TransactionPage = lazy(() => import("./pages/TransactionPage"))
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"))
const TransactionFormPage = lazy(() => import("./pages/TransactionFormPage"))

const transactionRoutes: Routes = [
    {
        path: "",
        component: TransactionsPage,
        children: [
            { path: "all", breadcrumb: { title: "Todos", icon: "public" } },
            { path: "incomes", breadcrumb: { title: "Ingresos", icon: "add_card" } },
            { path: "expenses", breadcrumb: { title: "Egresos", icon: "credit_card" } },
            { path: "overdue", breadcrumb: { title: "Atrasados", icon: "assignment_late" } }
        ]
    },
    {
        path: "create",
        component: TransactionFormPage
    },
    {
        path: ":id",
        component: TransactionPage,
        breadcrumb: {
            loader: {
                callback: (params) => getTransaction(params.id),
                titleAccessor: (data) => `${data.type}-${data.id}`,
                loaderCacheKey: (data) => [...transactionsCacheKey, Number(data.id)],
            },
        },
        children: [
            { path: "info", breadcrumb: { title: "Info", icon: "info" }, index: true },
            { path: "payer", breadcrumb: { title: "Emisor", icon: "person" } },
            { path: "loan", breadcrumb: { title: "Préstamo", icon: "mail" } }
        ]
    }
]

export default transactionRoutes