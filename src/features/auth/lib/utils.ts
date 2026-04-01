import type { ClaimPair } from "../models/claimPair";
import type { Role } from "../models/role";

export const generateUsername = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName.split(" ")[0]}`.toLowerCase();
};

export const getPermissionClaimPairsFromStringArray = (claims: Array<string>): Array<ClaimPair> => {
  return claims.map(claimValue => {
    return { claimType: "permission", claimValue }
  })
}

export const claimPairToString = (claim: ClaimPair) => {
  return `${claim.claimType}.${claim.claimValue}`
}

export const getRoleString = (role: Role) => `${role.id} | ${role.name}`
