import { Icon, LightBox } from "@/components";
import { IconName } from "@/models";
import { FileModel } from "@/models/fileModel";
import { useState } from "react";

interface ShowPhotoIconProps {
  image?: FileModel;
  src?: string;
  icon?: IconName;
}

const ShowPhotoIcon = ({ image, src, icon }: ShowPhotoIconProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Icon icon={icon ? icon : "image"} onClick={() => setShowModal(true)} />
      <LightBox
        files={
          image
            ? [image]
            : [{ url: src || "", publicId: "---", fileType: "---" }]
        }
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default ShowPhotoIcon;
