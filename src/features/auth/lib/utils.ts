import type { ClaimPair } from "../models/claimPair";

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
