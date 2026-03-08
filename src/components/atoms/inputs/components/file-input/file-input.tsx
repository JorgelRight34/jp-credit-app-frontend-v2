import { UploadIcon } from '@/components/atoms/icon'
import Input, { InputProps } from '../input/components/input'
import { useMemo, useRef } from 'react'
import { FileAccept } from '@/components/organisms'

export interface FileInputProps extends Omit<InputProps, 'type'> {
  multiple?: boolean
  accept?: FileAccept
}

const FileInput = ({
  onChange,
  multiple,
  accept,
  name,
  value,
  className,
  ...props
}: FileInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const displayValue = useMemo(() => {
    return value?.length > 0
      ? value.map((f: File) => f.name).join(', ')
      : 'Seleccione un archivo'
  }, [value])

  return (
    <label className={className}>
      <input
        ref={ref}
        type="file"
        name={name}
        id={name}
        accept={accept}
        hidden
        multiple={multiple}
        onChange={(e) => onChange?.(Array.from(e.currentTarget.files ?? []))}
      />
      <Input
        {...props}
        className="w-full"
        onClick={() => ref?.current?.click()}
        value={displayValue}
        readOnly
        icon={{
          icon: UploadIcon,
        }}
      />
    </label>
  )
}

export default FileInput
