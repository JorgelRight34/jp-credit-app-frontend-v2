import { User } from "../../../models/user";

export interface CurrentUser extends User {
    projectId?: number;
    projectName?: string;
}