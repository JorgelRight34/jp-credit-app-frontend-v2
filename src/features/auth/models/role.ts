import { ClaimPair } from "./claimPair";

export type Role = {
    id: number;
    name: string;
    normalizedName: string;
    usersCount: number;
    claims: Array<ClaimPair>;
}

export type PropsWithRole<T = object> = { role: Role } & T;