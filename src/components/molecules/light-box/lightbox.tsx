import Carousel from '../carousel/carousel'
import type { FileModel } from '@/models/fileModel'
import { CloseIcon, Icon, Image } from '@/components/atoms'

interface LightBoxInterface {
  files: Array<FileModel>
  show: boolean
  onHide: () => void
}

const LightBox = ({ files, show, onHide }: LightBoxInterface) => {
  const handleOnHide = (event: React.MouseEvent) => {
    event.stopPropagation()
    onHide()
  }

  if (!show) return null

  return (
    <div className="modal-overlay" onClick={handleOnHide}>
      <Icon
        icon={CloseIcon}
        onClick={handleOnHide}
        className="text-white"
        wrapperClassName="absolute top-4 right-4 z-50 text-white transition-colors hover:text-gray-300"
      />
      <Carousel>
        {files.map((file, key) => (
          <div
            key={key}
            className="p-lg-5"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={key}
              className="h-[400px]"
              src={file.url}
              alt={file.url}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default LightBox
