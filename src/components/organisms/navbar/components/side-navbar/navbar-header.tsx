import clsx from 'clsx'
import type { ImageProps } from '@/components/atoms'
import { Image, Link } from '@/components/atoms'

interface NavbarHeaderProps extends ImageProps {
  className?: string
}

const NavbarHeader = ({ className = '', alt, ...props }: NavbarHeaderProps) => {
  return (
    <Link to="/">
      <div className={clsx('flex items-center gap-3 p-3', className)}>
        <Image
          className="brand h-12 object-fit"
          alt={alt}
          style={{ objectFit: 'contain' }}
          {...props}
        />
      </div>
    </Link>
  )
}

export default NavbarHeader
