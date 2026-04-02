import { ImageProps } from '@unpic/react'
import clsx from 'clsx'

const AppHorizontalLogo = ({ className }: Partial<ImageProps>) => {
  return (
    <img
      className={clsx('brand brand-logo w-full', className)}
      alt="logo"
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}

export default AppHorizontalLogo
