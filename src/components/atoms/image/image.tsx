import { Image as UnpicImage } from '@unpic/react'
import clsx from 'clsx'
import type { ImageProps as UnpicImageProps } from '@unpic/react'

type FullWidthSafeProps = Omit<
  UnpicImageProps,
  'layout' | 'width' | 'height' | 'src' | 'alt'
>

export type ImageProps = FullWidthSafeProps & {
  src: string
  alt?: string
  aspect?: string
  fit?: 'cover' | 'contain'
  className?: string
  imgClassName?: string
  style?: React.CSSProperties
}

const Image = ({
  src,
  alt = '',
  aspect = 'video',
  fit = 'cover',
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
      className={clsx(
        'w-full',
        fit === 'cover' ? 'object-cover' : 'object-contain',
        className,
        imgClassName,
      )}
    />
  )
}

export default Image
