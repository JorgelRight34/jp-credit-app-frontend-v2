import { Routes } from "@/models";
import { lazy } from "react";

const AdjusmentNotesPage = lazy(() => import("./pages/AdjusmentNotesPage"))
const AdjusmentNoteFormPage = lazy(() => import("./pages/AdjustmentNoteFormPage"))

export const adjusmentNoteRoutes: Routes = [
    {
        path: "",
        component: AdjusmentNotesPage,
        children: [
            { path: "all", breadcrumb: { title: "Todos", icon: "public" } },
            { path: "credit", breadcrumb: { title: "Crédito", icon: "arrow_circle_down" } },
            { path: "debit", breadcrumb: { title: "Débito", icon: "arrow_circle_up" } }
        ]
    },
    {
        path: "create",
        component: AdjusmentNoteFormPage,

    }
]