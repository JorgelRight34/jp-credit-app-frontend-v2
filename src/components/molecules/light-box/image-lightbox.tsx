import { useState } from 'react'
import LightBox from './lightbox'
import type { FileModel } from '@/models/fileModel'
import { Image } from '@/components/atoms'
import { ND } from '@/lib/utils/constants'

interface ImageWithLightBoxProps {
  src: string
  alt: string
  className?: string
  image?: FileModel
}

const ImageWithLightBox = ({
  src,
  alt,
  image,
  className = '',
}: ImageWithLightBoxProps) => {
  const [showModal, setShowModal] = useState(false)

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
          image ? [image] : [{ url: src || '', publicId: '---', fileType: ND }]
        }
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  )
}

export default ImageWithLightBox
