import { lazy } from "react";
import { IconName, Routes } from "../../models";
import { getFirstAndLastName } from "@/lib/utils/utils";
import { profilesQueryKey } from "./lib/constants";
import { getProfile } from "./services/profilesClient";


const ProfilesPage = lazy(() => import("./pages/ProfilesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProfileFormPage = lazy(() => import("./pages/ProfileFormPage"));


const profileRoutesIcons: Record<string, IconName> = {
    client: "group",
    guarantor: "person_add",
    loanOfficer: "account_balance",
    user: "group_search"
}


export const profileRoutes: Routes = [
    {
        path: "",
        component: ProfilesPage,
        children: [
            { index: true, breadcrumb: { title: "Clientes", icon: profileRoutesIcons.client } },
            { index: true, path: "clients", breadcrumb: { title: "Clientes", icon: profileRoutesIcons.client } },
            { path: "guarantors", breadcrumb: { title: "Garantes", icon: profileRoutesIcons.guarantor } },
            { path: "loanOfficers", breadcrumb: { title: "Agentes", icon: profileRoutesIcons.loanOfficer } },
            { path: "all", breadcrumb: { title: "Todos", icon: profileRoutesIcons.user } },
        ],
    },
    {
        path: "create",
        component: ProfileFormPage
    },
    {
        path: ":id",
        breadcrumb: {
            icon: "person", loader: {
                callback: (params) => getProfile(params.id),
                titleAccessor: (data) => getFirstAndLastName(data),
                loaderCacheKey: (data) => [...profilesQueryKey, data.id]
            }
        },
        children: [
            {
                path: "", component: ProfilePage, children: [
                    { path: "loans", breadcrumb: { title: "Préstamos", icon: "calendar_month" } },
                    { path: "info", breadcrumb: { title: "Información", icon: "lightbulb_2" } },
                    { path: "collaterals", breadcrumb: { title: "Garantías", icon: "directions_car" } },
                    { path: "transactions", breadcrumb: { title: "Transacciones", icon: "account_balance" } },
                    { path: "deliquency", breadcrumb: { title: "Transacciones", icon: "warning" } },
                    { path: "follow-ups", breadcrumb: { title: "Notas", icon: "note_stack" } },
                ]
            },
            {
                path: "edit",
                component: ProfileFormPage,
            }

        ],
    },
];

export default profileRoutes;
