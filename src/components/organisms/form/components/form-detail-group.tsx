import FormGroupLayout from './fom-group-layout'
import type { FormGroupLayoutProps } from './fom-group-layout'
import { ContentCopyIcon, Input } from '@/components/atoms'

interface FormReadOnlyProps extends FormGroupLayoutProps {
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
      label={
        <>
          {label}{' '}
          {optional && <span className="text-accent">&nbsp;*&nbsp;</span>}{' '}
        </>
      }
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
