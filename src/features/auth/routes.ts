import { lazy } from "react";
import { Routes } from "../../models/route";
import { usersQueryKey } from "./lib/constants";
import { getUser } from "./services/userClient";
import { getFirstAndLastName } from "@/lib/utils/utils";


const AccessControlPage = lazy(
    () => import("./pages/AccessControlPage")
);
const UserPage = lazy(() => import("./pages/UserPage"))
const UserFormPage = lazy(() => import("./pages/UserFormPage"))
const PermissionsFormPage = lazy(() => import("./pages/PermissionsFormPage"))

const authRoutes: Routes = [
    {
        path: "",
        component: AccessControlPage,
        children: [
            { index: true, path: "admins", breadcrumb: { icon: "person", title: "Administradores" } },
            { path: "users", breadcrumb: { icon: "person", title: "Usuarios" } }
        ]
    },
    {
        path: "create",
        component: UserFormPage
    },
    {
        path: "permissions/:id",
        breadcrumb: { title: "Permisos", icon: "lock" },
        component: PermissionsFormPage
    },
    {
        path: "users/:id",
        breadcrumb: {
            icon: "person", loader: {
                callback: (params) => getUser(params.id),
                titleAccessor: (data) => getFirstAndLastName(data),
                loaderCacheKey: (data) => [...usersQueryKey, Number(data.id)]
            }
        },
        children: [
            {
                path: "", component: UserPage, children: [
                    { index: true, path: "info", breadcrumb: { icon: "info", title: "Datos" } },
                    { path: "info", breadcrumb: { icon: "info", title: "Datos" } },
                    { path: "loans", breadcrumb: { icon: "mail", title: "Préstamos" } },
                    { path: "transactions", breadcrumb: { icon: "credit_card", title: "Transacciones" } },
                    { path: "follow-ups", breadcrumb: { icon: "note_stack", title: "Seguimientos" } },
                ]
            },
            { path: "edit", component: UserFormPage }
        ]
    },

]

export default authRoutes