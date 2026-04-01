import { FormRef, UseDataFormProps, useForm } from "@/components";
import { ProjectUserFormValues } from "../lib/schemas/projectUserFormSchema";
import { addProjectsToUser } from "../services/projectClient";

export type ProjectUserFormRef = FormRef<ProjectUserFormValues>;

export const useProjectUserForm = (props: UseDataFormProps<void, ProjectUserFormValues> = {}) => {
    return useForm({
        onSubmit: addProjectsToUser,
        ...props
    })
}