import type { Profile } from "./profile";
import type { ProfileRole } from "./profileRole";
import type { Query } from "@/components";

export type ProfileQuery = Query & Partial<Profile> & {
    names?: string;
    role?: ProfileRole;
    DNI?: string;
}
