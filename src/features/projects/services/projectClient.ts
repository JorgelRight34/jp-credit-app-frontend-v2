import { Query } from "@/components";
import { PagedResponse } from "@/models";
import { Project } from "../models/project";
import api from "@/lib/services/api";
import { ProjectFormValues } from "../lib/schemas/projectFormSchema";
import { ProjectUserFormValues } from "../lib/schemas/projectUserFormSchema";
import { PROJECT_ID_KEY } from "@/lib/constants";

const baseUrl = "projects"

export const getProjects = async (params?: Query): Promise<PagedResponse<Project>> => {
    const { data } = await api.get(baseUrl, { params })
    return data;
}

export const getProject = async (id: Project["id"] | string) => {
    const { data } = await api.get(baseUrl + "/" + id);
    return data;
}

export const getCurrentProject = async (): Promise<Project | null> => {
    const projectId = localStorage.getItem(PROJECT_ID_KEY)
    if (projectId) return getProject(projectId)

    return null;
}

export const createProject = async (body: ProjectFormValues): Promise<Project> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const editProject = async (id: Project["id"], body: ProjectFormValues) => {
    await api.patch(baseUrl + "/" + id, body);
}

export const addProjectsToUser = async (body: ProjectUserFormValues) => {
    await api.post(`${baseUrl}/users`, body);
}