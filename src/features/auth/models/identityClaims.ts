import type { AppClaim } from "./appClaim";

export interface IdentityClaims {
    claims: Record<string, Array<AppClaim>>;
    roles: Array<string>
}
