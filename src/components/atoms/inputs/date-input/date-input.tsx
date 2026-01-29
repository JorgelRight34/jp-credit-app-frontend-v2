import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { muiSxConfig } from '../constants'
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
        minDate={min ? dayjs(min.toString()) : undefined}
        value={dayjs(value)}
        onChange={(e) => onChange?.(e?.toDate())}
        sx={muiSxConfig}
        slotProps={{
          textField: {
            size: 'small',
            className: '!rounded-xl',
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  )
}

export default DateInput
