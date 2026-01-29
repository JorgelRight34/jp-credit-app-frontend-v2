import { Collateral } from '../models/collateral'
import { toAllTitleCase } from '../../../lib/utils/utils'
import { Carousel } from 'react-bootstrap'
import ImageWithLightBox from '../../../components/ui/ImageWithLightBox'
import { defaultCollateralPhotoUrl } from '../lib/constants'
import { Icon } from '@/components/ui'

interface CollateralCardProps {
  collateral: Collateral
}

const CollateralCard = ({ collateral }: CollateralCardProps) => {
  return (
    <div className="border-accent-secondary rounded p-3 w-full shadow-sm">
      <h3 className="text-center mb-3">{collateral.title}</h3>
      <div className="w-full bg-dark mb-3">
        {collateral.photos.length > 1 ? (
          <Carousel interval={null}>
            {collateral.photos.map((photo) => (
              <Carousel.Item
                as={ImageWithLightBox}
                className="w-full h-[300px] object-contain"
                src={photo.url}
                alt={`Foto de ${collateral.title} (garantía)`}
                key={photo.id}
              />
            ))}
          </Carousel>
        ) : (
          <ImageWithLightBox
            className="rounded-lg shadow-sm w-full h-[300px] object-contain mb-3"
            src={collateral.photos[0]?.url || defaultCollateralPhotoUrl}
          />
        )}
      </div>
      <div className="d-flex flex-column">
        <span className="mx-auto">
          <Icon
            icon="person"
            label={toAllTitleCase(collateral.ownerName ?? 'Sin Dueño')}
          />
        </span>
      </div>
    </div>
  )
}

export default CollateralCard
