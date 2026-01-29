import clsx from 'clsx'
import type { ImageProps } from '@/components/atoms'
import { Image, Link } from '@/components/atoms'

interface NavbarHeaderProps extends ImageProps {
  className?: string
}

const NavbarHeader = ({ className = '', alt, ...props }: NavbarHeaderProps) => {
  return (
    <Link to="/">
      <div className={clsx('p-3', className)}>
        <Image className="img-fluid brand" alt={alt} {...props} />
      </div>
    </Link>
  )
}

export default NavbarHeader
