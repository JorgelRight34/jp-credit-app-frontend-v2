import { serverClient } from "@/lib/services/serverClient";
import { Report } from "../models/report";

export const getReportFromServer = async (id: Report["id"]): Promise<Report> => {
    return serverClient.get(`reports/${id}`);
}