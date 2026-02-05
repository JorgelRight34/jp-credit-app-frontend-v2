import { profilesQueryKey } from "../constants";
import { getClients, getGuarantors, getLoanOfficers, getProfiles } from "../../services/profileClient";
import type { ProfileRole } from "../../models/profileRole";
import type { ProfileQuery } from "../../models/profileQuery";
import type { Profile } from "../../models/profile";
import type { DataTableConfig } from "@/components";
import type { PagedResponse } from "@/models";
import { createDateDataCell, createLinkDataCell } from "@/components";
import { toAllTitleCase } from "@/lib/utils";

const loadersMap: Record<ProfileRole, (q: ProfileQuery) => Promise<PagedResponse<Profile>>> = {
    "profile": getProfiles,
    "client": getClients,
    "guarantor": getGuarantors,
    "loanOfficer": getLoanOfficers
}

export const createProfilesDataTableConfig = (role: ProfileRole): DataTableConfig<Profile> => ({
    title: "Pérfiles",
    columns: [
        {
            accessorKey: 'firstName',
            header: 'NOMBRES',
            enableSorting: true,
            cell: ({ row }) => createLinkDataCell(row.original.firstName, { to: "/profiles" }),
        },
        {
            accessorKey: 'lastName',
            header: 'APELLIDOS',
            enableSorting: true,
            cell: ({ row }) => toAllTitleCase(row.original.lastName),
        },
        {
            accessorKey: 'dateOfBirth',
            header: 'FECH. NACIMIENTO',
            enableSorting: true,
            cell: ({ row }) => createDateDataCell(row.original.dateOfBirth),
        },
        { accessorKey: 'gender', header: 'GENERO', enableSorting: true },
        {
            accessorKey: 'createdAt',
            header: 'FECHA',
            enableSorting: true,
            cell: ({ row }) => createDateDataCell(row.original.createdAt),
        },
        {
            accessorKey: 'id',
            header: 'ID',
            enableSorting: true,
        },
        {
            accessorKey: 'phoneNumber',
            header: 'CELULAR',
            enableSorting: true,
        },
    ],
    cacheKey: [profilesQueryKey, role],
    loader: loadersMap[role]
})