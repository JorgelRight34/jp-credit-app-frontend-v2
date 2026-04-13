import { serverClient } from "@/lib/services/serverClient";
import { Report } from "../models/report";

export const getReportFromServer = async (baseUrl: string, id: Report["id"]): Promise<Report> => {
    return serverClient.get(`${baseUrl}reports/${id}`);
}

const createGetReportFromServerHandler = (baseUrl: string) => (id: Report["id"]): Promise<Report> => {
    return serverClient.get(`${baseUrl}/reports/${id}`);
}

export const getLoanReportFromServer = createGetReportFromServerHandler("loans")
export const getTransactionReportFromServer = createGetReportFromServerHandler("transactions")
export const getCollateralReportFromServer = createGetReportFromServerHandler("collaterals")