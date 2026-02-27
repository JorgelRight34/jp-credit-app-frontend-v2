import clsx from 'clsx'
import TablePhotoCell from '../components/table-photo-cell'
import type { TablePhotoCellProps } from '../components/table-photo-cell'
import type { ReactNode } from 'react'
import type { LinkProps } from '@/components/atoms'
import { DateLabel, Link } from '@/components/atoms'
import SafeHtml from '@/components/molecules/safe-html/safe-html'
import { HeaderContext } from '@tanstack/react-table'

export const buildLinkDataCell = (label: ReactNode, linkProps: LinkProps) => {
  return (
    <Link className="text-accent-secondary" {...linkProps}>
      {label}
    </Link>
  )
}

export const buildTotalRowsFooter =
  <T,>(suffix: string) =>
  (info: HeaderContext<T, unknown>) =>
    `${info.table.options.data.length} ${suffix}`

export const buildOptionDataCell = (
  label: ReactNode,
  onClick: () => void,
  isDestructive?: boolean,
) => {
  return (
    <span
      className={clsx('text-accent-secondary', {
        '!text-red-500': isDestructive,
      })}
      onClick={onClick}
    >
      {label}
    </span>
  )
}

export const buildImageDataCell = (props: TablePhotoCellProps) => {
  return <TablePhotoCell {...props} />
}

export const buildDateDataCell = (date?: string) => {
  return <DateLabel date={date} />
}

export const buildExpandableDescriptionCell = (description: string) => {
  return <SafeHtml html={description} />
}

export const buildSingleSelectCell = (onClick: () => void) => {
  return (
    <span className="text-accent" onClick={onClick}>
      Seleccionar
    </span>
  )
}

export const buildIsActiveDataCell = (isActive: boolean) => {
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
