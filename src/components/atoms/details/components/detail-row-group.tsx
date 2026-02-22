import { PropsWithChildren } from 'react'

const DetailRowGroup = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-1 min-h-0 flex-col flex-wrap gap-4 items-between !justify-between">
      {children}
    </div>
  )
}

export default DetailRowGroup
