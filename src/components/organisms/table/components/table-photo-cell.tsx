import { startTransition, useState } from 'react'
import type { FileModel } from '@/models/fileModel'
import type { IconName } from '@/components/atoms/icon/models/iconName'
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
        className="!text-sm"
        icon={icon ? icon : ImageIcon}
        onClick={handleOnClick}
      />
      <LightBox
        files={
          image
            ? [image]
            : [
                {
                  id: 0,
                  url: fallback ?? '',
                  publicId: '---',
                  fileType: '---',
                  isImage: true,
                },
              ]
        }
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  )
}

export default TablePhotoCell
