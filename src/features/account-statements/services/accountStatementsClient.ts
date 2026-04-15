import { ExportHandler, toastService } from "@/components";
import api from "@/lib/services/api";
import { AccountStatementQuery } from "../models/accountStatementQuery";

export const exportProfileAccountStatus: ExportHandler<AccountStatementQuery> = async (params, { profileAs, profileId }) => {
    if (!profileId) toastService.error("Debe elegir un pérfil");

    return await api.get(`profiles/${profileAs}s/${profileId}/account-status/export`, { params, responseType: "blob" })
}