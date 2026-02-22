import { startTransition, useMemo, useState } from 'react'
import '../_navbar.css'
import type { NavItem } from '../../models/navItem'
import { Input, SearchIcon } from '@/components/atoms'

interface NavbarSearchProps {
  options: Array<NavItem>
  className?: string
  onChange?: (results: Array<NavItem>) => void
}

const NavbarSearch = ({ options, className, onChange }: NavbarSearchProps) => {
  const [query, setQuery] = useState('')
  const searchableOptions = useMemo(
    () =>
      options
        .flatMap((option) => [...(option.children ?? []), option])
        .map((o) => ({ ...o, nameLower: o.name.toLowerCase() })),
    [options],
  )

  const setFilteredOptions = (query: string) => {
    query = query.trim()

    if (query === '') {
      onChange?.([])
      return
    }

    const normalizedQuery = query.toLowerCase()

    onChange?.(
      searchableOptions.filter(
        (option) =>
          option.nameLower.includes(normalizedQuery) ||
          normalizedQuery.includes(option.nameLower),
      ),
    )
  }

  return (
    <Input
      icon={{ icon: SearchIcon, iconDirection: 'right' }}
      className={className}
      placeholder="Buscar..."
      value={query}
      onChange={(v: string) =>
        startTransition(() => {
          setQuery(v)
          setFilteredOptions(v)
        })
      }
    />
  )
}

export default NavbarSearch
