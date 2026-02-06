import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { SX_CONFIG } from '../../constants'
import type { DateFieldProps } from '@mui/x-date-pickers/DateField'

interface DateInputProps extends Omit<
  DateFieldProps,
  'defaultValue' | 'slotProps' | 'onChange'
> {
  min?: unknown
  onChange?: (value?: Date | string) => void
}

const DateInput = ({ value, min, onChange, ...props }: DateInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        enableAccessibleFieldDOMStructure={false}
        minDate={min ? dayjs(min.toString()) : undefined}
        value={!value ? null : dayjs(value)}
        onChange={(e) => onChange?.(e?.format('YYYY-MM-DD'))}
        slotProps={{
          textField: {
            size: 'small',
            className: '!rounded-xl border',
            fullWidth: true,
            sx: SX_CONFIG,
          },
        }}
      />
    </LocalizationProvider>
  )
}

export default DateInput
