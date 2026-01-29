import { lazy } from "react";
import { Routes } from "../../models/route";
import { getFollowUp } from "./services/followUpClient";
import { toAllTitleCase } from "@/lib/utils/utils";
import { followUpsCacheKey } from "./lib/constants";

const FollowUpsPage = lazy(
    () => import("./pages/FollowUpsPage")
);
const FollowUpFormPage = lazy(() => import("./pages/FollowUpFormPage"))
const FollowUpPage = lazy(() => import("./pages/FollowUpPage"))

const followUpRoutes: Routes = [
    {
        path: "",
        component: FollowUpsPage,
        children: [{ path: "", breadcrumb: { title: "Todos", icon: "public" } }]
    },
    {
        path: "create",
        component: FollowUpFormPage
    },
    {
        path: ":id",
        breadcrumb: {
            loader: {
                callback: (params) => getFollowUp(params.id),
                titleAccessor: (data) => toAllTitleCase(data.title),
                loaderCacheKey: (data) => [...followUpsCacheKey, Number(data.id)],
            },
        },
        children: [
            {
                path: "", component: FollowUpPage, children: [
                    { path: "info", breadcrumb: { title: "Info", icon: "info" } },
                    { path: "loan", breadcrumb: { title: "Préstamo", icon: "mail" } }
                ]
            },
            { path: "edit", component: FollowUpFormPage }
        ]
    }
]

export default followUpRoutes