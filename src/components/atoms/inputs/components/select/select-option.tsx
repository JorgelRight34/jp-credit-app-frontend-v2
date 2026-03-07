import { MenuItem } from '@mui/material'

export type SelectOptions<T = string | number | null> = Array<
  [T, string | number | null]
>

const SelectOption = MenuItem

export default SelectOption
