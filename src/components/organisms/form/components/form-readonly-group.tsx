import FormGroupLayout, { FormGroupLabel } from './fom-group-layout'
import type { FormGroupLayoutProps } from './fom-group-layout'
import { ContentCopyIcon, Input } from '@/components/atoms'

export interface FormReadOnlyProps extends FormGroupLayoutProps {
  value?: string | number
  optional?: boolean
  disabled?: boolean
}

export const readOnlyIconForInput = {
  icon: () => <ContentCopyIcon />,
  iconDirection: 'right',
}

const FormReadOnlyGroup = ({
  name,
  value,
  label,
  optional,
  disabled,
}: FormReadOnlyProps) => {
  return (
    <FormGroupLayout
      name={name}
      label={<FormGroupLabel label={label} optional={optional} />}
    >
      <Input
        className="w-full"
        value={value ?? 'N/D'}
        icon={readOnlyIconForInput}
        disabled={disabled}
        readOnly
      />
    </FormGroupLayout>
  )
}

export default FormReadOnlyGroup
