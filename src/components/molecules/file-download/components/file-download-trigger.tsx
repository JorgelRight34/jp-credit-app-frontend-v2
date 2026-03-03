import { useDataMutation } from '@/hooks/useMutate'
import { downloadFile } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface FileDownloadTriggerProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  'onClick'
> {
  filename?: string
  loader: () => Promise<Blob>
}

const FileDownloadTrigger = ({
  children,
  filename,
  loader,
  ...props
}: FileDownloadTriggerProps) => {
  const { mutateAsync } = useDataMutation({
    mutationFn: loader,
    onSuccess: downloadFile,
  })

  return (
    <span {...props} onClick={() => mutateAsync(filename)}>
      {children}
    </span>
  )
}

export default FileDownloadTrigger
