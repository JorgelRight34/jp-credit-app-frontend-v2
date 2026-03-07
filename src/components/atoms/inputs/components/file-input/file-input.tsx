import { UploadIcon } from '@/components/atoms/icon'
import Input, { InputProps } from '../input/components/input'
import { useRef, useState } from 'react'
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
  className,
  ...props
}: FileInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [displayValue, setDisplayValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? [])
    setDisplayValue(files.map((f) => f.name).join(', '))
    onChange?.(files)
  }

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
        onChange={handleChange}
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
