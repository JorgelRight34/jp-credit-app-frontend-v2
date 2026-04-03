import clsx from 'clsx'
import { ReactNode } from 'react'

interface NavbarCardProps {
  text: ReactNode
  image: ReactNode
  options?: ReactNode
  className?: string
}

const NavbarCard = ({ text, image, options, className }: NavbarCardProps) => {
  return (
    <div
      className={clsx(
        'bg-active-transparent flex w-full items-center justify-between rounded-lg border p-2 shadow-sm',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="h-8 w-8 flex-shrink-0">{image}</span>
        <span className="mr-auto flex min-w-0 flex-col">
          <span className="!truncate text-sm" title={text as string}>
            {text}
          </span>
        </span>
      </div>
      <span className="flex-shrink-0">{options}</span>
    </div>
  )
}

export default NavbarCard
