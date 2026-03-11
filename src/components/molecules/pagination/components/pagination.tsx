import { Pagination as MPagination } from '@mui/material'
import type { PaginationProps as MPaginationProps } from '@mui/material'

type PaginationProps = MPaginationProps

const Pagination = (props: PaginationProps) => {
  return (
    <MPagination
      variant="outlined"
      color="primary"
      sx={{
        '& .MuiPaginationItem-root': {
          color: 'var(--text-primary)',
          borderColor: 'var(--bs-border-color)',
        },
        '& .MuiPaginationItem-root:hover': {
          backgroundColor:
            'color-mix(in srgb, var(--primary-color) 10%, transparent)',
        },
        '& .MuiPaginationItem-root.Mui-selected': {
          backgroundColor:
            'color-mix(in srgb, var(--primary-color) 15%, transparent)',
          borderColor: 'var(--primary-color)',
          color: 'var(--primary-color)',
        },
        '& .MuiPaginationItem-root.Mui-selected:hover': {
          backgroundColor: 'var(--active-color)',
        },
      }}
      {...props}
    />
  )
}

export default Pagination
