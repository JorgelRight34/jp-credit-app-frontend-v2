import clsx from 'clsx'
import TablePhotoCell from '../components/table-photo-cell'
import type { TablePhotoCellProps } from '../components/table-photo-cell'
import type { ReactNode } from 'react'
import type { LinkProps } from '@/components/atoms'
import {
  BookmarkIcon,
  DateLabel,
  Link,
  TurnedInNotIcon,
} from '@/components/atoms'
import { HeaderContext } from '@tanstack/react-table'
import {
  DASHES,
  getDateGroupingLabel,
  getLocaleMonth,
  getUTCDate,
  toFormattedDate,
} from '@/lib/utils'
import { TimeUnit } from '@/models'
import SafeHtml from '@/components/molecules/safe-html/safe-html'

export const buildLinkDataCell = (label: ReactNode, linkProps: LinkProps) => {
  return (
    <Link
      className="text-accent-secondary break-words"
      preloadDelay={300} // 1 seconds
      {...linkProps}
    >
      {label}
    </Link>
  )
}

export const buildBookmarkedDataCell = (
  bookmarked: boolean,
  linkProps: LinkProps = {},
) => {
  return buildLinkDataCell(
    bookmarked ? <BookmarkIcon /> : <TurnedInNotIcon />,
    linkProps,
  )
}

export const buildDateGroupingFooter =
  <T,>(
    dateAccesor: (row: T) => string | Date | undefined,
    minDate?: Date | string,
    maxDate?: Date | string,
    timeUnit?: TimeUnit,
  ) =>
  (info: HeaderContext<T, unknown>) => {
    if (!minDate || !maxDate) return DASHES

    const firstRow = info.table.getRowModel().rows[0]?.original
    if (!firstRow) return DASHES

    const date = dateAccesor(firstRow)
    if (!date) return DASHES

    return getDateGroupingLabel(date, timeUnit ?? 1, {
      minDate: getUTCDate(minDate).toDate(),
      maxDate: getUTCDate(maxDate).toDate(),
    })
  }

export const buildDateGroupingCell = (
  date: Date | string,
  maxDate?: Date,
  timeUnit?: TimeUnit,
) => {
  switch (timeUnit) {
    case 365:
      return new Date(date).getUTCFullYear()
    case 30:
      const year = new Date(date).getUTCFullYear()
      return (
        getLocaleMonth(date) +
        (maxDate && maxDate.getUTCFullYear() > year ? ` ${year}` : '')
      )
    default:
      return toFormattedDate(date)
  }
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

export const buildOptionLinkDataCell = (
  label: ReactNode,
  linkProps: LinkProps,
  isDestructive?: boolean,
) => {
  return buildLinkDataCell(
    <span
      className={clsx('text-accent-secondary', {
        '!text-red-500': isDestructive,
      })}
    >
      {label}
    </span>,
    linkProps,
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
