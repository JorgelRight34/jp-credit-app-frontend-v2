import type { IdentityClaims } from "../models/identityClaims";
import type { ClaimPair } from "../models/claimPair";
import type { Role } from "../models/role";
import type { TransferItem } from "@/components";

export const generateUsername = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName.split(" ")[0]}`.toLowerCase();
};

export const getClaimPairsFromStringArray = (claims: Array<string>): Array<ClaimPair> => {
  return claims.map(claim => {
    const [claimType, claimValue] = claim.split(".");
    return { claimType, claimValue }
  })
}

export const claimPairToString = (claim: ClaimPair) => {
  return `${claim.claimType}.${claim.claimValue}`
}

export const getRoleString = (role: Role) => `${role.id} | ${role.name}`

export const mapIdentityClaimsToTransferItems = (
  claims: IdentityClaims["claims"],
): Array<TransferItem> => {
  return Object.entries(claims).flatMap(([type, values]) =>
    values.map(({ value, description }) => ({
      id: value,
      label: `${type} | ${value}${description ? ` | ${description}` : ''}`,
    })),
  )
}