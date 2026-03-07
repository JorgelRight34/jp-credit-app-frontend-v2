import { useId } from 'react'
import clsx from 'clsx'
import type { InputProps } from '../input/components/input'
import type { ReactNode } from 'react'

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
      <label
        htmlFor={id}
        className={clsx('cursor-pointer', {
          'pointer-events-none cursor-not-allowed opacity-50': reachedLimit,
        })}
      >
        {children}
      </label>
    </>
  )
}

export default FileInputWrapper
