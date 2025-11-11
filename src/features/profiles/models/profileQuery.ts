import { Query } from "../../../models/query";
import { Profile } from "./profile";
import { ProfileRole } from "./profileRole";

export type ProfileQuery = Query & Partial<Profile> & { names?: string; role?: ProfileRole }
