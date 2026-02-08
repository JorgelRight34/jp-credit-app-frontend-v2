import clsx from 'clsx'
import TablePhotoCell from '../components/table-photo-cell'
import type { TablePhotoCellProps } from '../components/table-photo-cell'
import type { ReactNode } from 'react'
import type { LinkProps } from '@/components/atoms'
import { DateLabel, Link } from '@/components/atoms'

export const createLinkDataCell = (label: ReactNode, linkProps: LinkProps) => {
  return (
    <Link className="text-accent-secondary" {...linkProps}>
      {label}
    </Link>
  )
}

export const createImageDataCell = (props: TablePhotoCellProps) => {
  return <TablePhotoCell {...props} />
}

export const createDateDataCell = (date: string) => {
  return <DateLabel date={date} />
}

export const createSingleSelectCell = (onClick: () => void) => {
  return (
    <span className="text-accent" onClick={onClick}>
      Seleccionar
    </span>
  )
}

export const createIsActiveDataCell = (isActive: boolean) => {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={clsx(
          'inline-block h-2.5 w-2.5 rounded-full',
          isActive ? 'bg-emerald-700' : 'bg-zinc-400',
        )}
        aria-hidden
      />
      <span>{isActive ? 'Activo' : 'Inactivo'}</span>
    </span>
  )
}
