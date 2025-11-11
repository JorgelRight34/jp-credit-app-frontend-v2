import ProfilesSection from "./ProfilesSection";
import {
  profilesQueryKey,
  profileRolesSpanishTranslations,
} from "../lib/constants";
import { getProfile } from "../services/profilesClient";
import { Profile } from "../models/profile";
import { EntitySearchInputProps } from "@/models";
import { EntitySearchInput } from "@/components/EntityForm";
import { getFullName, toTitleCase } from "@/utils/utils";
import { ProfileQuery } from "../models/profileQuery";

type ProfileSearchInputProps = EntitySearchInputProps<Profile, ProfileQuery>;

const ProfileSearchInput = ({
  role = "profile",
  id,
  onChange,
  ...props
}: ProfileSearchInputProps) => {
  return (
    <EntitySearchInput<Profile, ProfileQuery>
      cacheKey={profilesQueryKey}
      modalProps={{
        title: `Buscar ${toTitleCase(
          profileRolesSpanishTranslations[role ?? "profile"],
        )}`,
        height: "90dvh",
        width: "75dvw",
      }}
      accesorFn={(p) => p?.id}
      visibleValueFn={getFullName}
      onSearch={getProfile}
      role={role}
      onChange={onChange}
      id={id}
      render={(setValue) => (
        <ProfilesSection {...props} table={{ onRowClick: setValue }} />
      )}
      {...props}
    />
  );
};

export default ProfileSearchInput;
