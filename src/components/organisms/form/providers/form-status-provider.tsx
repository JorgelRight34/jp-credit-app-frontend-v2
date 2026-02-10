import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

const FormStatusContext = createContext<boolean | null>(null)

export const FormStatusProvider = ({
  children,
  readOnly,
}: {
  children: ReactNode
  readOnly: boolean
}) => {
  return <FormStatusContext value={readOnly}>{children}</FormStatusContext>
}

export const useIsFormReadonly = () => {
  const context = useContext(FormStatusContext)

  if (context === null) {
    throw new Error('must use this hook inside its provider')
  }

  return context
}
