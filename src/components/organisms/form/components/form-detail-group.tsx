import FormGroupLayout from './fom-group-layout'
import type { FormGroupLayoutProps } from './fom-group-layout'
import { ContentCopyIcon, Input } from '@/components/atoms'

interface FormReadOnlyProps extends FormGroupLayoutProps {
  value?: string | number
  optional?: boolean
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
        readOnly
      />
    </FormGroupLayout>
  )
}

export default FormReadOnlyGroup
