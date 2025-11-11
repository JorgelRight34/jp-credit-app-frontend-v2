import { User } from "../../Auth/models/user";
import ImageWithLightBox from "../../../components/ui/ImageWithLightBox";
import { getProfilePicWithInitials, isProfile } from "../lib/utils";
import { Profile } from "../models/profile";
import { Icon } from "@/components/ui";
import { getFirstAndLastName } from "@/utils/utils";

interface ProfileCardProps {
  profile: Profile | User;
  className?: string;
}

const ProfileCard = ({ profile, className }: ProfileCardProps) => {
  return (
    <div
      className={`border-accent-secondary rounded p-3 shadow-sm md:max-w-xs ${className}`}
    >
      {/* Heading */}
      <h3 className="text-center mb-3 truncate">
        {getFirstAndLastName(profile)}
      </h3>
      {/* Image */}
      <ImageWithLightBox
        className="rounded-lg shadow-sm w-full h-[300px] object-cover mb-3"
        src={profile.photo?.url || getProfilePicWithInitials(profile)}
        alt={`Foto de ${profile.firstName}`}
        image={profile.photo}
      />
      {/* Contact */}
      <div className="flex flex-col">
        {/* Email */}
        {profile.email && (
          <span
            className="flex w-full items-center truncate justify-center mx-auto cursor-pointer mb-2"
            title={profile.email}
            data-title={profile.email}
          >
            <span>
              <Icon icon="mail" label={profile.email} className="mr-2" />
            </span>
          </span>
        )}
        {/* Address */}
        {isProfile(profile) && (
          <span
            className="flex w-full items-center justify-center mx-auto cursor-pointer"
            title={profile.address}
            data-title={profile.address}
          >
            <Icon
              icon="pin_drop"
              wrapperClassName="truncate"
              label={profile.address}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
