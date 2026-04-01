import { User } from "@/models/user";
import { Project } from "../../models/project";

export type ProjectUserFormValues = {
    projectIds: Array<Project["id"]>;
    userId: User["id"]
}
