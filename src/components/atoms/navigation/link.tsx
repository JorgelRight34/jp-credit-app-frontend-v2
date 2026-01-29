import { Link as TanstackRouterLink } from '@tanstack/react-router'
import type { LinkProps as TanstackRouterLinkProps } from '@tanstack/react-router'

export type LinkProps = TanstackRouterLinkProps
export type Route = TanstackRouterLinkProps['to']

const Link = TanstackRouterLink

export default Link
