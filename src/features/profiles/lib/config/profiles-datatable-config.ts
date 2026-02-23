import { getClients, getGuarantors, getLoanOfficers, getProfiles } from "../../services/profileClient";
import type { ProfileRole } from "../../models/profileRole";
import type { ProfileQuery } from "../../models/profileQuery";
import type { Profile } from "../../models/profile";
import type { DataTableConfig } from "@/components";
import type { PagedResponse } from "@/models";
import { createDateDataCell, createLinkDataCell, createSingleSelectCell } from "@/components";
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
            accessorKey: 'id',
            header: 'ID',
            enableSorting: true,
        },
        {
            accessorKey: 'firstName',
            header: 'NOMBRES',
            enableSorting: true,
            cell: ({ row }) => createLinkDataCell(row.original.firstName, { to: "/profiles/$id", params: { id: row.original.id.toString() } }),
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
            cell: ({ row }) => createDateDataCell(row.original.dateOfBirth),
        },
        {
            accessorKey: 'createdAt',
            header: 'FECHA',
            enableSorting: true,
            cell: ({ row }) => createDateDataCell(row.original.createdAt),
        },
        {
            accessorKey: 'landline',
            header: 'TELEFONO',
            enableSorting: true,
        },
        {
            accessorKey: 'phoneNumber',
            header: 'CELULAR',
            enableSorting: true,
        },
    ],
    loader: loadersMap[role]
})

export const createProfileSearchInputDataTableConfig = (onSelect: (profile: Profile) => void, role: ProfileRole = "profile"): DataTableConfig<Profile> => {
    return {
        title: "Buscar pérfil",
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
        { id: "select", cell: ({ row }) => createSingleSelectCell(() => onSelect(row.original)) }
        ],
        loader: loadersMap[role]
    }
}