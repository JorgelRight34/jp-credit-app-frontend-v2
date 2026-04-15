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
      {/* 
        Using a plain div instead of <Activity> because <Activity mode="hidden"> 
        runs effect cleanups on hidden tabs, which breaks react-hook-form's internal 
        state when other steps reset or mutate the form. The div keeps the form 
        fully mounted and reactive at all times.
      */}
      <div className={active === 0 ? '' : 'hidden'}>{children}</div>
      <Activity mode={active === 1 ? 'visible' : 'hidden'}>
        <Suspense fallback="confirmation...">{confirmation}</Suspense>
      </Activity>
      <Activity mode={active === 2 ? 'visible' : 'hidden'}>{overview}</Activity>
    </>
  )
}

export default FormConfirmationFlow
