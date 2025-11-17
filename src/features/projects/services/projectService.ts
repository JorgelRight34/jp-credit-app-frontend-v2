import { Query } from "@/models/query";
import { PagedResponse } from "../../../models/pagedResponse";
import api from "../../../services/api";
import { fetchEntity, fetchWithQueryParams } from "../../../utils/utils";
import { ProjectFormValues } from "../lib/projectForm";
import { ProjectSettingsFormValues } from "../lib/projectSettingsForm";
import { Project } from "../models/project";
import { projectsTag } from "../lib/constants";
import { getModulePermissions } from "@/features/auth";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/utils/constants";


const baseUrl = "projects";

export const createProject = async (
  data: ProjectFormValues
): Promise<Project> => {
  const response = await api.post(`${baseUrl}`, data);
  return response.data;
};

export const getProjectsModulePermissions = async () => {
  return await getModulePermissions(baseUrl + "/" + PERMISSIONS_ENDPOINT_SUFFIX)
}

export const getProject = async (id: number | string): Promise<Project> => {
  return await fetchEntity(`${baseUrl}/${id}`, [projectsTag, id.toString()], 3000)
};

export const editProject = async (
  data: ProjectFormValues | ProjectSettingsFormValues,
  id: number
): Promise<Project> => {
  const response = await api.put(`${baseUrl}/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: number | string) => {
  const response = await api.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const getProjects = async (query: Query): Promise<PagedResponse<Project>> => {
  return await fetchWithQueryParams("projects", query)
};

export const projectsClient = {
  getProjects,
  getProject,
  deleteProject,
  createProject,
  editProject,
}
