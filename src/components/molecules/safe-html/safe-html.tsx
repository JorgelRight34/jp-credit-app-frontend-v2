import { useMemo } from 'react'
import DOMPurify from 'dompurify'

type SafeHtmlProps = {
  html: string
  className?: string
}

/**
 * Safely renders an HTML string by sanitizing it first.
 * Protects against XSS attacks.
 */
const SafeHtml = ({ html, className }: SafeHtmlProps) => {
  const sanitizedHtml = useMemo(() => DOMPurify.sanitize(html), [html])

  return (
    <div
      className={`text-secondary ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}

export default SafeHtml
