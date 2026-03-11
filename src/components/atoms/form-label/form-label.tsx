import { FormLabelProps, FormLabel as MFormLabel } from '@mui/material'

const FormLabel = ({ className, ...props }: FormLabelProps) => (
  <MFormLabel {...props} className={`text-secondary w-full ${className}`} />
)

export default FormLabel
