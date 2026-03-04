import { Report } from "../models/report"

export const reporstQueryKey = "reports"

export const buildReportQueryKey = (id: Report["id"]) => [reporstQueryKey, id]