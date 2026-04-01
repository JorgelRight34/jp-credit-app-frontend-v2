import { User } from "@/models/user";
import { Project } from "./project";

export interface ProjectUser {
    id: number;
    projectId: Project["id"];
    userId: User["id"]
}