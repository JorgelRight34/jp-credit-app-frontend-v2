import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'
import { FieldValues } from 'react-hook-form'

type TransactionFlowActiveStepType = [number, Dispatch<SetStateAction<number>>]
type FormConfirmationDataType<T extends FieldValues> =
  | [T | null, Dispatch<SetStateAction<T | null>>]
  | null

const FormConfirmationActiveStepContext =
  createContext<TransactionFlowActiveStepType | null>(null)

const FormConfirmationDataContext =
  createContext<FormConfirmationDataType<FieldValues>>(null)

export const FormConfirmationFlowProvider = ({
  children,
}: PropsWithChildren) => {
  return (
    <FormConfirmationFlowActiveStepProvider>
      <FormConfirmationFlowDataProvider>
        {children}
      </FormConfirmationFlowDataProvider>
    </FormConfirmationFlowActiveStepProvider>
  )
}

export const FormConfirmationFlowActiveStepProvider = ({
  children,
  initialStep = 0,
}: PropsWithChildren<{ initialStep?: number }>) => {
  const state = useState<number>(initialStep)

  return (
    <FormConfirmationActiveStepContext.Provider value={state}>
      {children}
    </FormConfirmationActiveStepContext.Provider>
  )
}

export const FormConfirmationFlowDataProvider = ({
  children,
}: PropsWithChildren) => {
  const state = useState<FieldValues | null>(null)

  return (
    <FormConfirmationDataContext.Provider value={state}>
      {children}
    </FormConfirmationDataContext.Provider>
  )
}

export const useFormConfirmationFlowActiveStep = () => {
  const context = useContext(FormConfirmationActiveStepContext)

  if (!context) {
    throw new Error(
      'useFormConfirmationActiveStep must be used within FormConfirmationProvider',
    )
  }

  return context
}

export const useFormConfirmationFlowData = () => {
  const context = useContext(FormConfirmationDataContext)

  if (!context) {
    throw new Error(
      'useFormConfirmationData must be used within FormConfirmationProvider',
    )
  }

  return context
}
