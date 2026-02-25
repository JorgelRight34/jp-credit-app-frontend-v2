import { serverClient } from "@/lib/services/serverClient";
import { FollowUp } from "../models/followUp";

export const getFollowUpFromServer = async (id: FollowUp["id"]): Promise<FollowUp> => {
    return await serverClient.get("follow-ups/" + id);
}