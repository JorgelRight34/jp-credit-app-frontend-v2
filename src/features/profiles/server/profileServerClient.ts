import type { Profile } from "../models/profile";
import { serverClient } from "@/lib/services/serverClient"

export const getProfileFromServer = async (id: number): Promise<Profile> => {
    return await serverClient.get<Profile>(`profiles/${id}`);

}