import { Icon, LightBox } from "@/components/ui";
import { ApiFile, IconName } from "@/models";
import { useState } from "react";

interface ShowPhotoIconProps {
  image?: ApiFile;
  src?: string;
  icon?: IconName;
}

const ShowPhotoIcon = ({ image, src, icon }: ShowPhotoIconProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOnClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <Icon icon={icon ? icon : "image"} onClick={handleOnClick} />
      <LightBox
        files={image ? [image] : [{ url: src || "", publicId: "---" }]}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default ShowPhotoIcon;
