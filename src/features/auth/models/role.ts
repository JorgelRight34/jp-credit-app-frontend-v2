import type { IdentityPermissions } from "./identityPermissions";

export type Role = {
    id: number;
    name: string;
    normalizedName: string;
    usersCount: number;
    permissions?: IdentityPermissions
}