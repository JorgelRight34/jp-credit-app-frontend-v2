import ProfilesDataTable from "./ProfilesDataTable";
import { ProfileQuery } from "../models/profileQuery";
import ProfileQuerySearch from "./ProfileQuerySearch";
import { Profile } from "../models/profile";
import { EntitySection, EntitySectionProps } from "@/components";
import { ProfileRole } from "../models/profileRole";

interface ProfilesSectionProps
  extends EntitySectionProps<Profile, ProfileQuery> {
  role?: ProfileRole;
}

const ProfilesSection = ({
  role = "profile",
  ...props
}: ProfilesSectionProps) => {
  return (
    <EntitySection
      Search={ProfileQuerySearch}
      DataTable={(table) => <ProfilesDataTable role={role} {...table} />}
      {...props}
    />
  );
};

export default ProfilesSection;
