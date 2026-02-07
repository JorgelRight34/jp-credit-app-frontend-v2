import { useState } from 'react'
import DocumentIcon from '../icons/document-icon'
import type { TableFile } from '../models/tableFile'
import { LightBox } from '@/components/molecules'
import { toastService } from '@/lib/services'
import { isImage } from '@/lib/utils'

interface FilenameCellProps {
  file: TableFile
}

const FilenameCell = ({ file }: FilenameCellProps) => {
  const [showlightBox, setShowLightBox] = useState(false)

  const onRowClick = () => {
    const type = file.fileType

    if (isImage(type)) {
      setShowLightBox(true)
      return
    }

    if (file.url) {
      window.open(file.url, '_blank', 'noopener,noreferrer')
      return
    }

    toastService.error(`Un archivo de tipo ${type} no se puede visualizar.`)
  }

  return (
    <>
      <div className="flex items-center">
        <DocumentIcon type={file.fileType} />
        <span
          className="text-accent mr-3 ml-2 cursor-pointer"
          onClick={onRowClick}
        >
          {file.name} {file.fileType.replace('.', '')}
        </span>
      </div>
      <LightBox
        files={[file]}
        show={showlightBox}
        onHide={() => setShowLightBox(false)}
      />
    </>
  )
}

export default FilenameCell
