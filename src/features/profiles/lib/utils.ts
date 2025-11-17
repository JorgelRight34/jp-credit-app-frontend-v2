
import { getFirstAndLastName, getPicWithInitials } from "@/utils/utils";
import { Profile } from "../models/profile";
import { profileRolesSpanishTranslations } from "./constants";
import { User } from "@/features/auth";
import { ProfileRole } from "../models/profileRole";
import { defaultProfilePic } from "@/utils/constants";

export const getProfilePicWithInitials = (
  profile: User | Profile | undefined | null,
  background = "random",
  color = ""
) => {
  return profile ? getPicWithInitials(getFirstAndLastName(profile), background, color) : defaultProfilePic;
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
