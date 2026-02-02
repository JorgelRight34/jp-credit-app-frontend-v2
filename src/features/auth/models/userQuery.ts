import type { Query } from "@/components";
import type { Role } from "./role";

export interface UserQuery extends Query {
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: Role
    email?: string;
}