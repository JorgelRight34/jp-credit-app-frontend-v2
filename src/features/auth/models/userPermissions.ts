import type { ClaimPair } from "./claimPair";

export interface UserPermissions {
  claims: Array<ClaimPair>;
  roles: Array<string>;
}
