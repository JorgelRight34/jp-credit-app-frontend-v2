import { Link as TanstackRouterLink } from '@tanstack/react-router'
import type { LinkProps as TanstackRouterLinkProps } from '@tanstack/react-router'

export type LinkProps = TanstackRouterLinkProps
export type Route = TanstackRouterLinkProps['to']
export type Search =
  | TanstackRouterLinkProps['search']
  | Record<string, string | number | boolean>
export type RouteParams = TanstackRouterLinkProps['params']

const Link = TanstackRouterLink

export default Link
