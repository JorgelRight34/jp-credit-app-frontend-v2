import type { Role } from "./role";
import type { ClaimPair } from "./claimPair";

export interface IdentityPermissions {
  claims: Array<ClaimPair>;
  roles: Array<Role>;
}
