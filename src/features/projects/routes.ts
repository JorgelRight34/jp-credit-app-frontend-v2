import { lazy } from "react"
import { Routes } from "../../models/route"

const ProjectSettingsPage = lazy(() => import("./pages/ProjectSettingsPage"))
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"))
const ProjectPage = lazy(() => import("./pages/ProjectPage"))

const projectRoutes: Routes = [
    {
        path: "projects/settings",
        component: ProjectSettingsPage,
    },
    {
        path: "projects/:tab?",
        component: ProjectsPage
    },
    {
        path: "project/:id/:tab?",
        component: ProjectPage
    }
]

export default projectRoutes