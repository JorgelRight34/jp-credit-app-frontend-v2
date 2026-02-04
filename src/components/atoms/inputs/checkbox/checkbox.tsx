import { Checkbox as MUICheckbox } from '@mui/material'

const Checkbox = ({ value, onChange, type, ...props }: any) => {
  return <MUICheckbox {...props} />
}

export default Checkbox
