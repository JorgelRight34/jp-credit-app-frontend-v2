import { ProfileRole } from "@/features/Profiles/models/profileRole";
import { Query } from "../../../models/query";

export interface AccountProfileQuery extends Query {
  profileId?: number;
  profileAs?: ProfileRole;
}
