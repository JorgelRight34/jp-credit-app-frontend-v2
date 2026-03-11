import { useId } from 'react'
import clsx from 'clsx'
import type { InputProps } from '../input/components/input'
import type { ReactNode } from 'react'
import FormLabel from '@/components/atoms/form-label/form-label'

interface FileInputWrapperProps extends InputProps {
  reachedLimit?: boolean
  accept?: HTMLInputElement['accept']
  children?: ReactNode
}

const FileInputWrapper = ({
  children,
  name,
  accept,
  reachedLimit,
  onChange,
}: FileInputWrapperProps) => {
  const id = useId()

  return (
    <>
      <input
        type="file"
        className="hidden"
        name={name ?? ''}
        id={id}
        accept={accept}
        disabled={reachedLimit}
        onChange={onChange}
      />
      <FormLabel
        htmlFor={id}
        className={clsx('cursor-pointer !w-auto', {
          'pointer-events-none cursor-not-allowed  opacity-50': reachedLimit,
        })}
      >
        {children}
      </FormLabel>
    </>
  )
}

export default FileInputWrapper
