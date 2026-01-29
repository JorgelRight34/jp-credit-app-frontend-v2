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
    <div
      className={clsx(
        'relative w-full overflow-hidden',
        `aspect-${aspect}`,
        className,
      )}
      style={style}
    >
      <UnpicImage
        {...props}
        layout="fullWidth"
        src={src}
        alt={alt}
        className={clsx(
          'absolute inset-0 h-full w-full',
          fit === 'cover' ? 'object-cover' : 'object-contain',
          imgClassName,
        )}
      />
    </div>
  )
}

export default Image
