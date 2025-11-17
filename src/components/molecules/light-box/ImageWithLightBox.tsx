"use client";

import { useState } from "react";
import LightBox from "./LightBox";
import { Image } from "@/components/atoms";
import { FileModel } from "@/models/fileModel";
import { ND } from "@/utils/constants";

interface ImageWithLightBoxProps {
  src: string;
  alt: string;
  className?: string;
  image?: FileModel;
}

const ImageWithLightBox = ({
  src,
  alt,
  image,
  className = "",
}: ImageWithLightBoxProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Image
        className={className}
        src={src}
        alt={alt}
        onClick={() => setShowModal(true)}
      />
      <LightBox
        files={
          image ? [image] : [{ url: src || "", publicId: "---", fileType: ND }]
        }
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default ImageWithLightBox;
