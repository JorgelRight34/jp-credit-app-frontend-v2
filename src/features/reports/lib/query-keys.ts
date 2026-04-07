import { Report } from "../models/report"

export const reporstQueryKey = "reports"

export const buildReportQueryKey = (id: Report["id"], key: Report["key"]) => [reporstQueryKey, key, id]

export const buildReportQueryKeyByReportKey = (id: Report["key"], subkey?: string) => [reporstQueryKey, "key", id, subkey ?? null]