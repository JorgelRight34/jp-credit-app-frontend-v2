import { PropsWithChildren } from 'react'
import FormGroupLayout, { FormGroupLabel } from './fom-group-layout'
import type { FormGroupLayoutProps } from './fom-group-layout'
import {
  ContentCopyIcon,
  Icon,
  Input,
  Link,
  LinkProps,
  OpenInNewIcon,
} from '@/components/atoms'
import { copyToClipboard } from '@/lib/utils'
import { toastService } from '@/components/molecules'

export interface FormReadOnlyProps extends FormGroupLayoutProps {
  value?: string | number | null
  optional?: boolean
  disabled?: boolean
}

export const readOnlyIconForInput = {
  icon: () => <ReadOnlyIcon />,
  iconDirection: 'right',
}

const FormReadOnlyGroup = ({
  name,
  value,
  label,
  className,
  optional,
  disabled,
}: FormReadOnlyProps) => {
  return (
    <FormGroupLayout
      name={name}
      className={className}
      label={<FormGroupLabel label={label} optional={optional} />}
    >
      <Input
        className="w-full"
        value={value ?? 'N/D'}
        icon={{
          icon: () => <ReadOnlyIcon value={value?.toString()} />,
          iconDirection: 'right',
        }}
        disabled={disabled}
        readOnly
      />
    </FormGroupLayout>
  )
}

export const FormReadonlyGroupLabelLink = ({
  children,
  ...props
}: Omit<LinkProps, 'children'> & PropsWithChildren) => {
  return (
    <Link {...props} className="!inline-block w-auto">
      <div className="flex items-center">
        <span>{children}</span>&nbsp;
        <Icon className="!text-sm" icon={OpenInNewIcon} />
        &nbsp;
      </div>
    </Link>
  )
}

const ReadOnlyIcon = ({ value }: { value?: string }) => {
  const handleOnCopy = async () => {
    if (value) {
      if (await copyToClipboard(value)) {
        toastService.success('Copiado')
      }
    }
  }

  return <ContentCopyIcon className="text-muted" onClick={handleOnCopy} />
}

export default FormReadOnlyGroup
