import { ProfilePicCard } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { getFirstAndLastName } from "@/utils/utils";

interface CurrentUserPicCardProps {
  className?: string;
  showBorder?: boolean;
  height?: string;
  color?: string;
  width?: string;
  background?: string;
}

const CurrentUserPicCard = ({
  className,
  height = "",
  width = "",
  background = "random",
  color = "",
  showBorder = true,
}: CurrentUserPicCardProps) => {
  const { user } = useAuth();

  return (
    <ProfilePicCard
      className={className}
      style={{ height, width }}
      showBorder={showBorder}
      src={
        user
          ? user?.photoUrl ??
            `https://ui-avatars.com/api/?name=${getFirstAndLastName(
              user
            )}&background=${background.replace("#", "")}&color=${color.replace(
              "#",
              ""
            )}`
          : undefined
      }
    />
  );
};

export default CurrentUserPicCard;
