import { FormLabelProps, FormLabel as MFormLabel } from '@mui/material'

const FormLabel = ({ className = '', ...props }: FormLabelProps) => (
  <MFormLabel
    {...props}
    className={`w-full ${className}`}
    sx={{ color: `var(--text-secondary)`, fontSize: 'inherit' }}
  />
)

export default FormLabel
