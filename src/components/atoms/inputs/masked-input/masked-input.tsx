import { IMaskInput } from 'react-imask'
import Input from '../input/components/input'

export type MaskInputProps = {
  name?: string
  placeholder?: string
  value?: string | number
  mask?: string
  onChange?: (val?: string) => void
}

const MaskedInput = ({ onChange, mask, value, ...props }: MaskInputProps) => {
  return (
    <IMaskInput
      {...props}
      mask={mask}
      value={value?.toString()}
      definitions={{
        '#': /[0-9]/,
      }}
      onAccept={(_, maskRef) => onChange?.(maskRef.unmaskedValue)}
      overwrite
    />
  )
}

const MaskInput = ({ mask, onChange, ...props }: MaskInputProps) => {
  return (
    <Input
      {...props}
      inputComponent={(inputProps) => (
        <MaskedInput {...inputProps} onChange={onChange} mask={mask} />
      )}
    />
  )
}

MaskedInput.displayName = 'MaskedInput'

export default MaskInput
