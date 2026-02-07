import { startTransition, useState } from 'react'
import type { FileModel } from '@/models/fileModel'
import type { IconName } from '@/components/atoms/icon/iconName'
import { Icon, ImageIcon, LightBox } from '@/components'

export interface TablePhotoCellProps {
  getImage: () => FileModel | undefined
  fallback?: string
  icon?: IconName
}

const TablePhotoCell = ({ fallback, getImage, icon }: TablePhotoCellProps) => {
  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState<FileModel>()

  const handleOnClick = () => {
    setShowModal(true)
    startTransition(() => setImage(getImage()))
  }

  return (
    <>
      <Icon
        className="!text-base"
        icon={icon ? icon : ImageIcon}
        onClick={handleOnClick}
      />
      <LightBox
        files={
          image
            ? [image]
            : [{ url: fallback ?? '', publicId: '---', fileType: '---' }]
        }
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  )
}

export default TablePhotoCell
