import { getClients, getGuarantors, getLoanOfficers, getProfiles } from "../../services/profileClient";
import type { ProfileRole } from "../../models/profileRole";
import type { ProfileQuery } from "../../models/profileQuery";
import type { Profile } from "../../models/profile";
import type { DataTableConfig } from "@/components";
import type { PagedResponse } from "@/models";
import { buildDateDataCell, buildLinkDataCell, buildSingleSelectCell } from "@/components";
import { DASHES, toAllTitleCase } from "@/lib/utils";

const loadersMap: Record<ProfileRole, (q: ProfileQuery) => Promise<PagedResponse<Profile>>> = {
    "profile": getProfiles,
    "client": getClients,
    "guarantor": getGuarantors,
    "loanOfficer": getLoanOfficers
}

export const createProfilesDataTableConfig = (role: ProfileRole): DataTableConfig<Profile> => ({
    columns: [
        {
            accessorKey: 'id',
            header: 'ID',
            enableSorting: true,
        },
        {
            accessorKey: 'firstName',
            header: 'NOMBRES',
            enableSorting: true,
            cell: ({ row }) => buildLinkDataCell(row.original.firstName, { to: "/profiles/$id", params: { id: row.original.id.toString() } }),
        },
        {
            accessorKey: 'lastName',
            header: 'APELLIDOS',
            enableSorting: true,
            cell: ({ row }) => toAllTitleCase(row.original.lastName),
        },
        {
            accessorKey: "dni",
            header: "DOCUMENTO",
            enableSorting: true
        },
        {
            accessorKey: 'dateOfBirth',
            header: 'FECH. NACIMIENTO',
            enableSorting: true,
            cell: ({ row }) => buildDateDataCell(row.original.dateOfBirth),
        },
        {
            accessorKey: 'createdAt',
            header: 'FECHA',
            enableSorting: true,
            cell: ({ row }) => buildDateDataCell(row.original.createdAt),
        },
        {
            accessorKey: 'landline',
            header: 'TELEFONO',
            enableSorting: true,
        },
        {
            accessorKey: 'phoneNumber',
            header: 'CELULAR',
            cell: ({ row }) => row.original.phoneNumber ?? DASHES,
            enableSorting: true,
        },
    ],
    loader: loadersMap[role]
})

export const createProfileSearchInputDataTableConfig = (onSelect: (profile: Profile) => void, role: ProfileRole = "profile"): DataTableConfig<Profile> => {
    return {
        columns: [{
            accessorKey: 'firstName',
            header: 'NOMBRES',
            enableSorting: true,
        },
        {
            accessorKey: 'lastName',
            header: 'APELLIDOS',
            enableSorting: true,
            cell: ({ row }) => toAllTitleCase(row.original.lastName),
        },
        {
            accessorKey: "dni",
            header: "DOCUMENTO",
            enableSorting: true
        },
        {
            accessorKey: 'id',
            header: 'ID',
            enableSorting: true,
        },
        { id: "select", cell: ({ row }) => buildSingleSelectCell(() => onSelect(row.original)) }
        ],
        loader: loadersMap[role]
    }
}