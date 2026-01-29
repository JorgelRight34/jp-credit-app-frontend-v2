import type { Role } from "./role";
import type { Query } from "@/models/query";

export interface UserQuery extends Query {
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: Role
}