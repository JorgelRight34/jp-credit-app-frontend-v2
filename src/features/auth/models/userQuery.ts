import { Query } from "@/models/query";
import { Role } from "./role";

export interface UserQuery extends Query {
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: Role
}