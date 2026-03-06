import { Image as UnpicImage } from '@unpic/react'
import type { ImageProps as UnpicImageProps } from '@unpic/react'

type FullWidthSafeProps = Omit<
  UnpicImageProps,
  'layout' | 'width' | 'height' | 'src' | 'alt'
>

export type ImageProps = FullWidthSafeProps & {
  src: string
  alt?: string
  aspect?: string
  className?: string
  imgClassName?: string
  style?: React.CSSProperties
}

const Image = ({
  src,
  alt = '',
  aspect = 'video',
  className,
  imgClassName,
  style,
  ...props
}: ImageProps) => {
  return (
    <UnpicImage
      {...props}
      layout="fullWidth"
      src={src}
      alt={alt}
      className={imgClassName + ' ' + className}
    />
  )
}

export default Image
