import { PERMISSIONS_ENDPOINT_SUFFIX } from "../../../lib/constants/constants";
import type { ClaimPair } from "../models/claimPair";
import type { Column } from "@/components";

export const permissionsQueryKey = "permissions";

export const usersModulePermissionsEndpoint = "users" + PERMISSIONS_ENDPOINT_SUFFIX
export const rolesQueryKey = "roles"

export const usersQueryKey = "users"

export const usersModuleRootPath = "/access-control"

export const claimsTableColumns: Array<Column<ClaimPair>> = [
    { id: 'claimType', accessorKey: 'claimType', header: "TIPO", enableSorting: true },
    { id: 'claimValue', accessorKey: 'claimValue', header: "VALOR", enableSorting: true },
]