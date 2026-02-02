import clsx from 'clsx'
import { Button } from '../button'
import Skeleton from './Skeleton'
import type { SkeletonProps } from './Skeleton'

const ButtonSkeleton = ({ className }: SkeletonProps) => {
  return (
    <Skeleton className={clsx('px-3 py-2', className)}>
      <Button className="flex-shrink-0"></Button>
    </Skeleton>
  )
}

export default ButtonSkeleton
