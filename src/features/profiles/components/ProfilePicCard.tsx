import clsx from "clsx";
import LoadingSpinner from "./LoadingSpinner";

interface ProfilePicCardProps {
  src?: string;
  className?: string;
  showBorder?: boolean;
  style?: Record<string, string>;
}

const ProfilePicCard = ({
  src,
  showBorder = true,
  style = {},
  className = "",
}: ProfilePicCardProps) => {
  return (
    <div
      className={clsx("relative", className, {
        "profile-pic-card-wrapper": showBorder && src,
        "!invisible": !src,
      })}
      style={style}
    >
      <img
        src={src}
        className={clsx("rounded-circle profile-pic-card", {
          "!hidden": !src,
        })}
        style={style}
      />
      <LoadingSpinner style={style} className={clsx({ hidden: !!src })} />
    </div>
  );
};

export default ProfilePicCard;
