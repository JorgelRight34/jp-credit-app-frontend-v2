import { startTransition, useEffect, useMemo, useState } from 'react'
import '../_navbar.css'
import type { NavItem } from '../../models/navItem'
import { Input } from '@/components/atoms'

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
  const [inputValue, setInputValue] = useState('')

  const allOptions = useMemo<Array<NavItem>>(
    () => options.flatMap((option) => [...(option.children ?? []), option]),
    [options],
  )

  const filteredOptions = useMemo<Array<NavItem>>(() => {
    if (inputValue == '') return options

    return allOptions.filter(
      (option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        inputValue.toLowerCase().includes(option.name),
    )
  }, [inputValue, options, allOptions])

  useEffect(() => {
    onSearch?.(filteredOptions)
  }, [filteredOptions, onSearch])

  return (
    <Input
      icon={{ icon: 'search', iconDirection: 'left' }}
      className={className}
      placeholder="Buscar..."
      value={inputValue}
      onChange={(v: string) => startTransition(() => setInputValue(v))}
    />
  )
}

export default NavbarSearch
