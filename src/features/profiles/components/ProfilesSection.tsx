import ProfilesDataTable from "./ProfilesDataTable";
import { ProfileQuery } from "../models/profileQuery";
import ProfileQuerySearch from "./ProfileQuerySearch";
import { ProfileRole } from "../models/profileRole";
import { Profile } from "../models/profile";
import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";
import EntitySection from "@/components/EntitySection/components/EntitySection";

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
