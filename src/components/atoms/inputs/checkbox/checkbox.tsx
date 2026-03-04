import { Checkbox as MUICheckbox } from '@mui/material'

const Checkbox = ({ value, onChange, type, ...props }: any) => {
  return <MUICheckbox onChange={onChange} {...props} />
}

export default Checkbox
