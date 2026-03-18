import { Project } from "../models/project";
import { projectsQueryKey } from "./constants";

export const createProjectQueryKey = (id: Project["id"]) => {
    return [projectsQueryKey, id];
}

export const currentProjectIdQueryKey = [projectsQueryKey, "current"]