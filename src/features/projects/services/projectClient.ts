import { Query } from "@/components";
import { PagedResponse } from "@/models";
import { Project } from "../models/project";
import api from "@/lib/services/api";

const baseUrl = "projects"

export const getProjects = async (params: Query): Promise<PagedResponse<Project>> => {
    const { data } = await api.get(baseUrl, { params })
    return data;
}