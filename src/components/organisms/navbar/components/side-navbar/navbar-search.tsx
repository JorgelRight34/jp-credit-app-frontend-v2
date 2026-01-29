import { startTransition, useMemo } from 'react'
import '../_navbar.css'
import type { NavItem } from '../../models/navItem'
import { Input, SearchIcon } from '@/components/atoms'

interface NavbarSearchProps {
  options: Array<NavItem>
  className?: string
  onSearch?: (results: Array<NavItem>) => void
}

const NavbarSearch = ({
  options,
  className = '',
  onSearch,
}: NavbarSearchProps) => {
  const searchableOptions = useMemo(
    () =>
      options
        .flatMap((option) => [...(option.children ?? []), option])
        .map((o) => ({ ...o, nameLower: o.name.toLowerCase() })),
    [options],
  )

  const setFilteredOptions = (query: string) => {
    query = query.trim()

    if (query == '') {
      onSearch?.(options)
    }

    const normalizedQuery = query.toLowerCase()

    onSearch?.(
      searchableOptions.filter(
        (option) =>
          option.nameLower.includes(normalizedQuery) ||
          normalizedQuery.includes(option.nameLower),
      ),
    )
  }

  return (
    <Input
      icon={{ icon: SearchIcon, iconDirection: 'left' }}
      className={className}
      placeholder="Buscar..."
      onChange={(v: string) =>
        startTransition(() => {
          setFilteredOptions(v)
        })
      }
    />
  )
}

export default NavbarSearch
