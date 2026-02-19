import { PropsWithChildren, useCallback } from 'react'
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
    <FormGroupLabel
      label={
        <Link {...props}>
          <div className="flex items-center gap-3">
            <span>{children}</span>
            <Icon className="!text-sm" icon={OpenInNewIcon} />
          </div>
        </Link>
      }
    />
  )
}

const ReadOnlyIcon = ({ value }: { value?: string }) => {
  const handleOnCopy = useCallback(async () => {
    if (value) {
      if (await copyToClipboard(value)) {
        toastService.success('Copiado')
      }
    }
  }, [])

  return <ContentCopyIcon onClick={handleOnCopy} />
}

export default FormReadOnlyGroup
