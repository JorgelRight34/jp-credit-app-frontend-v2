import { UseDataFormProps, useForm } from "@/components"
import { projectFormSchema, ProjectFormValues } from "../lib/schemas/projectFormSchema"
import { createProject, editProject } from "../services/projectClient"
import { Project } from "../models/project"
import { projectsQueryKey } from "../lib/constants"
import { usersQueryKey } from "@/features/auth"

interface UseProjectFormProps extends UseDataFormProps<Project, ProjectFormValues> {
    project?: Project
}

export const useProjectForm = ({ project, ...config }: UseProjectFormProps) => {
    return useForm({
        schema: projectFormSchema,
        defaultValues: project ? {
            name: project.name,
            graceDays: project.graceDays,
            defaultPenaltyRate: project.defaultPenaltyRate
        } : { name: "", graceDays: "", defaultPenaltyRate: "" },
        shouldEdit: !!project,
        onSubmit: createProject,
        onEdit: (body) => editProject(project!.id, body),
        keysToInvalidate: [[projectsQueryKey, usersQueryKey]],
        ...config
    })
}