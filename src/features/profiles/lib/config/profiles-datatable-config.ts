import { profilesQueryKey } from "../constants";
import { getClients, getGuarantors, getLoanOfficers, getProfiles } from "../../services/profileClient";
import type { ProfileRole } from "../../models/profileRole";
import type { ProfileQuery } from "../../models/profileQuery";
import type { Profile } from "../../models/profile";
import type { DataTableConfig } from "@/components";
import type { PagedResponse } from "@/models";
import { createDateDataCell, createLinkDataCell } from "@/components";
import { getAge, toAllTitleCase } from "@/lib/utils";

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
            header: 'Id',
            enableSorting: true,
        },
        {
            accessorKey: 'createdAt',
            header: 'Fecha',
            enableSorting: true,
            cell: ({ row }) => createDateDataCell(row.original.createdAt),
        },
        {
            accessorKey: 'firstName',
            header: 'Nombres',
            enableSorting: true,
            cell: ({ row }) => toAllTitleCase(row.original.firstName),
        },
        {
            accessorKey: 'lastName',
            header: 'Apellidos',
            enableSorting: true,
            cell: ({ row }) => toAllTitleCase(row.original.lastName),
        },
        {
            accessorKey: 'dateOfBirth',
            header: 'Edad',
            enableSorting: true,
            cell: ({ row }) => getAge(row.original.dateOfBirth),
        },
        { accessorKey: 'gender', header: 'Género', enableSorting: true },
        {
            accessorKey: 'phoneNumber',
            header: 'Celular',
            enableSorting: true,
            cell: ({ row }) => createLinkDataCell(row.original.phoneNumber, { href: "tel:" + row.original.phoneNumber }),
        }
    ],
    cacheKey: [profilesQueryKey, role],
    loader: loadersMap[role]
})