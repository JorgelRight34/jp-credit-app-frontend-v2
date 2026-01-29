import { lazy } from "react";
import { Routes } from "../../models/route";

const AccountStatementsPage = lazy(() => import("./pages/AccountStatementsPage"))

export const accountStatementsRoutes: Routes = [
    {
        path: "",
        component: AccountStatementsPage,
        children: [
            { path: "all", breadcrumb: { title: "Todos", icon: "public" } },
            { path: "client", breadcrumb: { title: "Cliente", icon: "person" } },
            { path: "guarantor", breadcrumb: { title: "Garante", icon: "person" } },
        ]
    }
]
