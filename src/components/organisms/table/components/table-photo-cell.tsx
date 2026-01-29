import { useState } from 'react'
import type { FileModel } from '@/models/fileModel'
import type { IconName } from '@/components/atoms/icon/iconName'
import { Icon, ImageIcon, LightBox } from '@/components'

interface TablePhotoCellProps {
  image?: FileModel
  src?: string
  icon?: IconName
}

const TablePhotoCell = ({ image, src, icon }: TablePhotoCellProps) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Icon icon={icon ? icon : ImageIcon} onClick={() => setShowModal(true)} />
      <LightBox
        files={
          image
            ? [image]
            : [{ url: src || '', publicId: '---', fileType: '---' }]
        }
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  )
}

export default TablePhotoCell
