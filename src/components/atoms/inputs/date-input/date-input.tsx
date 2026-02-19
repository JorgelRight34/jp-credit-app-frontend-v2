import Input, { InputProps } from '../input/components/input'

interface DateInputProps extends InputProps {}

const DateInput = (props: DateInputProps) => {
  return <Input {...props} type="date" />
}

export default DateInput
