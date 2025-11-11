import { ProfileRole } from "@/features/Profiles/models/profileRole";
import { Query } from "../../../models/query";

export interface FollowUpQuery extends Query {
  id?: number;
  title?: string;
  body?: string;
  profileId?: number;
  profileAs?: ProfileRole;
}
