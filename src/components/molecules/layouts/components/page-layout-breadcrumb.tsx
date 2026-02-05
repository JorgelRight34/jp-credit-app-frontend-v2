import { Breadcrumb } from '../../breadcrumb'
import type { BreadcrumbSpec } from '../../breadcrumb'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { HomeIcon } from '@/components/atoms'
import { SMALL_SCREEN_BREAKPOINT } from '@/lib/utils'

const homeBreadcrumbs: Array<BreadcrumbSpec> = [
  { title: 'Home', icon: () => <HomeIcon />, pathname: '/' },
]

const PageLayoutBreadcrumb = ({
  breadcrumbs,
}: {
  breadcrumbs: Array<BreadcrumbSpec>
}) => {
  const isSmallScreen = useMediaQuery(SMALL_SCREEN_BREAKPOINT)

  return (
    <Breadcrumb
      maxItems={isSmallScreen ? 3 : 4}
      breadcrumbs={homeBreadcrumbs.concat(breadcrumbs)}
    />
  )
}

export default PageLayoutBreadcrumb
