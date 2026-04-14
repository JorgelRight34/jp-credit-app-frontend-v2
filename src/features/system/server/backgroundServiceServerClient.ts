import { serverClient } from "@/lib/services/serverClient";
import { BackgroundService } from "../models/backgroundService";

export const getBackgroundServiceFromServer = async (id: string | number): Promise<BackgroundService> => {
    return await serverClient.get("background-service-configurations/" + id);
}