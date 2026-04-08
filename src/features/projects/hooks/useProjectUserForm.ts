import { FormRef, UseDataFormProps, useForm } from "@/components";
import { ProjectUserFormValues } from "../lib/schemas/projectUserFormSchema";
import { addProjectsToUser } from "../services/projectClient";
import { Project } from "../models/project";

export type ProjectUserFormRef = FormRef<ProjectUserFormValues>;

export const useProjectUserForm = ({ defaultValues, ...props }: UseDataFormProps<void, ProjectUserFormValues> = {}) => {
    return useForm<void, ProjectUserFormValues>({
        onSubmit: async ({ userId, projectIds }) => {
            await addProjectsToUser(userId, {
                add: projectIds,
                remove: [],
            });
        },
        onEdit: async ({ userId, projectIds }) => {
            const initialProjects = defaultValues?.projectIds as Array<Project["id"]>;

            const projectsToRemove =
                initialProjects?.filter((p) => !projectIds.includes(p)) ?? [];

            const projectsToAdd = projectIds.filter(
                (p) => !initialProjects?.includes(p)
            );

            await addProjectsToUser(userId, {
                add: projectsToAdd,
                remove: projectsToRemove,
            });
        },
        defaultValues,
        ...props
    })
} 