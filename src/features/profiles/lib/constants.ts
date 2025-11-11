import { PermissionsProvider } from "@/models/permissionsProvider";
import { MaritalStatus } from "../models/maritalStatus";
import { ProfileRole } from "../models/profileRole";
import { getProfileModulePermissions } from "../services/profilesClient";
import { CacheKey, QuerySearchInput } from "@/models";
import { Query } from "@/models/query";


export const profilesQueryKey: CacheKey = ["profiles"];

export const profileRolesSpanishTranslations: Record<ProfileRole, string> = {
  loanOfficer: "asesor",
  loanofficer: "asesor",
  client: "cliente",
  guarantor: "garante",
  profile: "pérfil",
};

export const roles: Record<string, ProfileRole> = {
  loanOfficer: "loanOfficer",
  client: "client",
  guarantor: "guarantor",
};


export const maritalStatusSpanishTranslations: Record<MaritalStatus, string> = {
  married: "casado",
  single: "soltero",
  widow: "viudo",
  divorced: "divorciado",
};


export const profilesPath = "/profiles"

export const profileModulePermissionsProvider: PermissionsProvider = {
  getPermissions: getProfileModulePermissions,
  cacheKey: [profilesQueryKey]
}

export const profileAsQuerySearchOption: QuerySearchInput<Query> = {
  name: "profileAs",
  id: "profileAs",
  type: "select",
  label: "Como",
  options: [["client", "Cliente"], ["guarantor", "Garante"], ["loanOfficer", "Agente"]]
}