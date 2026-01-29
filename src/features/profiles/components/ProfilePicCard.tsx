import clsx from "clsx";
import { Image, LoadingSpinner } from "@/components";

interface ProfilePicCardProps {
  src: string;
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
      <Image
        src={src}
        className={clsx("rounded-circle profile-pic-card", {
          "!hidden": !src,
        })}
        alt={src}
        style={style}
      />
      <LoadingSpinner style={style} className={clsx({ hidden: !!src })} />
    </div>
  );
};

export default ProfilePicCard;
