import type { ClaimPair } from "../models/claimPair";

export const generateUsername = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName.split(" ")[0]}`.toLowerCase();
};

export const getClaimPairsFromStringArray = (claims: Array<string>): Array<ClaimPair> => {
  return claims.map(claim => {
    const [type, value] = claim.split(".");
    return { type, value }
  })
}

export const claimPairToString = (claim: ClaimPair) => {
  return `${claim.type}.${claim.value}`
}
