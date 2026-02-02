import Paragraph from '../text/paragraph'
import Skeleton from './Skeleton'
import type { SkeletonProps } from './Skeleton'

const ParagraphSkeleton = ({ ...props }: SkeletonProps) => {
  return (
    <Skeleton {...props}>
      <Paragraph>&nbsp;</Paragraph>
    </Skeleton>
  )
}

export default ParagraphSkeleton
