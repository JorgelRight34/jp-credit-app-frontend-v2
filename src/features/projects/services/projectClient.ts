import { Query } from "@/components";
import { PagedResponse } from "@/models";
import { Project } from "../models/project";
import api from "@/lib/services/api";
import { ProjectFormValues } from "../lib/schemas/projectFormSchema";

const baseUrl = "projects"

export const getProjects = async (params: Query): Promise<PagedResponse<Project>> => {
    const { data } = await api.get(baseUrl, { params })
    return data;
}

export const getProject = async (id: Project["id"]) => {
    const { data } = await api.get(baseUrl + "/" + id);
    return data;
}

export const createProject = async (body: ProjectFormValues): Promise<Project> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const editProject = async (id: Project["id"], body: ProjectFormValues) => {
    await api.patch(baseUrl + "/" + id, body);
}