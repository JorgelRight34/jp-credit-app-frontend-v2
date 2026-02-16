import { serverClient } from "@/lib/services/serverClient";
import { Project } from "../models/project";

export const getProjectFromServer = async (id: Project["id"]) => {
    return await serverClient.get<Project>("projects/" + id);
}
