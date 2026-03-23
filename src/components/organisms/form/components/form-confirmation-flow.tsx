import { Activity, PropsWithChildren, ReactNode, Suspense } from 'react'
import {
  FormConfirmationFlowProvider,
  useFormConfirmationFlowActiveStep,
} from '../providers/form-confirmation-provider'

interface FormConfirmationFlowProps extends PropsWithChildren {
  confirmation: ReactNode
  overview: ReactNode
}

const FormConfirmationFlow = ({
  children,
  ...props
}: FormConfirmationFlowProps) => {
  return (
    <FormConfirmationFlowProvider>
      <FormConfirmationFlowInner {...props}>
        {children}
      </FormConfirmationFlowInner>
    </FormConfirmationFlowProvider>
  )
}

const FormConfirmationFlowInner = ({
  confirmation,
  overview,
  children,
}: FormConfirmationFlowProps) => {
  const [active] = useFormConfirmationFlowActiveStep()

  return (
    <>
      <Activity mode={active === 0 ? 'visible' : 'hidden'}>{children}</Activity>
      <Activity mode={active === 1 ? 'visible' : 'hidden'}>
        <Suspense fallback="confirmation...">{confirmation}</Suspense>
      </Activity>
      <Activity mode={active === 2 ? 'visible' : 'hidden'}>{overview}</Activity>
    </>
  )
}

export default FormConfirmationFlow
