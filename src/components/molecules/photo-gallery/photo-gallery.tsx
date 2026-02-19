import { ContainerProps, Image } from '@/components/atoms'
import { Carousel } from '@/components/molecules'
import { FileModel } from '@/models/fileModel'
import clsx from 'clsx'

interface PhotoGalleryProps extends ContainerProps {
  photos: Array<FileModel>
  itemHeight?: number
  itemBackground?: string
}

const PhotoGallery = ({
  photos,
  className,
  itemHeight,
  itemBackground,
}: PhotoGalleryProps) => {
  return (
    <div className={clsx('overflow-hidden border rounded-xl', className)}>
      <Carousel>
        {photos.map((photo) => (
          <Carousel.Item
            height={itemHeight}
            background={itemBackground}
            key={photo.id}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
              loading="lazy"
              src={photo.url}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default PhotoGallery
