import { ProfileRole } from "@/features/profiles";
import { Query } from "@/models/query";

export interface AccountProfileQuery extends Query {
  profileId?: number;
  profileAs?: ProfileRole;
}
