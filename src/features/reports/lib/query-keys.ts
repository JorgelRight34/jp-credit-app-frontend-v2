import { Report } from "../models/report"

export const reporstQueryKey = "reports"

export const buildReportQueryKey = (id: Report["id"]) => [reporstQueryKey, id]

export const buildReportQueryKeyByReportKey = (id: Report["key"], subkey?: string) => [reporstQueryKey, "key", id, subkey ?? null]