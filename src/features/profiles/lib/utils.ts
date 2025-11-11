
import { User } from "@/features/Auth/models/user";
import { getFirstAndLastName, getPicWithInitials } from "@/utils/utils";
import { ProfileRole } from "@/features/Profiles/models/profileRole";
import { Profile } from "../models/profile";
import { profileRolesSpanishTranslations } from "./constants";

export const getProfilePicWithInitials = (
  profile: User | Profile,
  background = "random"
) => {
  return getPicWithInitials(getFirstAndLastName(profile), background);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isProfile(obj: any): obj is Profile {
  return obj && typeof obj.address === "string"; // adjust property check as needed
}

export const isValidRole = (value: string): value is ProfileRole => {
  return Object.keys(profileRolesSpanishTranslations).includes(
    value.toLowerCase() as ProfileRole
  );
};


export const getProfilesEndpointForRole = (role: ProfileRole) => {
  let suffix = "";

  switch (role) {
    case "client":
      suffix = "clients";
      break;
    case "guarantor":
      suffix = "guarantors"
      break;
    case "loanOfficer":
      suffix = "loan-officers"
      break;
    default:
      break;
  }

  return `profiles/${suffix}`
}
