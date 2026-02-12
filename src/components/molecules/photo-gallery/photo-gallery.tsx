import { Container, ContainerProps, Image } from '@/components/atoms'
import { Carousel } from '@/components/molecules'
import { FileModel } from '@/models/fileModel'

interface PhotoGalleryProps extends ContainerProps {
  photos: Array<FileModel>
}

const PhotoGallery = ({ photos, ...props }: PhotoGalleryProps) => {
  return (
    <Container className="bg-black" {...props}>
      <Carousel>
        {photos.map((photo) => (
          <Carousel.Item key={photo.id}>
            <Image objectFit="contain" loading="lazy" src={photo.url} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}

export default PhotoGallery
