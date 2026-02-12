import SafeHtml from '@/components/molecules/safe-html/safe-html'
import { FormReadOnlyProps } from './form-readonly-group'
import { Box } from '@mui/material'
import { SX_CONFIG } from '@/components/atoms/constants'
import FormGroupLayout, { FormGroupLabel } from './fom-group-layout'
import { ContentCopyIcon, Icon } from '@/components/atoms'

type FormHtmlDisplayGroupProps = FormReadOnlyProps

const FormHtmlDisplayGroup = ({
  value,
  label,
  optional,
  ...props
}: FormHtmlDisplayGroupProps) => {
  return (
    <FormGroupLayout
      label={
        <div className="flex items-center justify-between w-full">
          <span>
            <FormGroupLabel label={label} optional={optional} />
          </span>
          <Icon icon={ContentCopyIcon} />
        </div>
      }
      {...props}
    >
      <Box
        className="border py-2 p-3 w-full h-1oo overflow-y-auto"
        sx={SX_CONFIG}
      >
        <SafeHtml html={value?.toString() ?? ''} />
      </Box>
    </FormGroupLayout>
  )
}

export default FormHtmlDisplayGroup
