import { lazy } from "react";
import { Routes } from "../../models/route";
import { toAllTitleCase } from "@/lib/utils/utils";
import { getCollateral } from "./services/collateralsClient";
import { collateralsQueryKey } from "./lib/constants";

const CollateralPage = lazy(
    () => import("./pages/CollateralPage")
);
const CollateralsPage = lazy(
    () => import("./pages/CollateralsPage")
);

const CollateralFormPage = lazy(() => import("./pages/CollateralFormPage"))

const collateralRoutes: Routes = [
    {
        path: "",
        component: CollateralsPage,
        children: [
            { path: "all", breadcrumb: { title: "Todos", icon: "public" } },
            { path: "vehicles", breadcrumb: { title: "Vehículos", icon: "directions_car" } },
            { path: "mobiliary", breadcrumb: { title: "Mobiliario", icon: "apartment" } },
            { path: "farm", breadcrumb: { title: "Agrícola", icon: "agriculture" } },
            { path: "collateralizations", breadcrumb: { title: "Liquidados", icon: "lock" } }
        ]
    },
    {
        path: "create",
        component: CollateralFormPage
    },
    {
        path: ":id",
        breadcrumb: {
            icon: "directions_car",
            loader: {
                callback: (params) => getCollateral(params.id),
                titleAccessor: (data) => toAllTitleCase(data.title),
                loaderCacheKey: (data) => [...collateralsQueryKey, Number(data.id)],
            },
        },
        children: [
            {
                path: "",
                component: CollateralPage,
                children: [
                    { path: "info", breadcrumb: { title: "Info", icon: "info" } },
                    { path: "loan", breadcrumb: { title: "Préstamo", icon: "mail" } },
                    { path: "client", breadcrumb: { title: "Cliente", icon: "person" } },
                    { path: "files", breadcrumb: { title: "Archivos", icon: "files" } },
                ]
            },
            {
                path: "edit",
                component: CollateralFormPage
            }
        ]
    },
]

export default collateralRoutes