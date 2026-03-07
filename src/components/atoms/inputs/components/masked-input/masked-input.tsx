import { IMaskInput } from 'react-imask'
import { forwardRef, useMemo } from 'react'
import Input from '../input/components/input'
import type { InputProps } from '../input/components/input'
import type { InputBaseComponentProps } from '@mui/material'

export type MaskInputProps = {
  name?: string
  placeholder?: string
  value?: string | number
  mask?: string
  onChange?: (val?: string) => void
}

/**
 * Public MaskInput component.
 *
 * forwardRef is used again so:
 * - parent components (forms, RHF, focus managers) can still access the input
 * - the ref chain remains intact: Parent → MUI Input → IMask → DOM input
 *
 * useMemo is CRITICAL here:
 * - MUI treats `inputComponent` by identity, not by shape
 * - creating it inline would generate a new component on every render
 * - that would force MUI to unmount/remount the input, causing focus loss
 */
const MaskInput = forwardRef<
  HTMLInputElement,
  MaskInputProps & Partial<InputProps> & { mask: string }
>(({ mask, ...props }, ref) => {
  const MaskedInputWithMask = useMemo(
    () =>
      forwardRef<HTMLInputElement, any>((inputProps, inputRef) => (
        <MaskedInput {...inputProps} mask={mask} ref={inputRef} />
      )),
    [mask],
  )

  return <Input ref={ref} {...props} inputComponent={MaskedInputWithMask} />
})

/**
 * Low-level masked input.
 *
 * forwardRef is REQUIRED here because:
 * - MUI controls focus, selection and imperative actions via refs
 * - IMaskInput needs the real DOM input ref (inputRef)
 * - without forwarding the ref, the input would be remounted and lose focus
 */
const MaskedInput = forwardRef<HTMLInputElement, InputBaseComponentProps>(
  ({ onChange, mask, ...props }, ref) => {
    return (
      <IMaskInput
        {...props}
        mask={mask}
        definitions={{
          '#': /[0-9]/,
        }}
        inputRef={ref} // Bridge MUI's ref to the actual DOM input used by IMask
        // Mimic event
        onAccept={(_, maskRef) =>
          onChange({ target: { value: maskRef.unmaskedValue } })
        }
        overwrite
      />
    )
  },
)

MaskedInput.displayName = 'MaskedInput'

export default MaskInput
