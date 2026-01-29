import type { ReactNode } from 'react'

interface FormButtonsContainerProps {
  submitBtn: ReactNode
  deleteBtn: ReactNode
  edit?: boolean
}

const FormButtonsContainer = ({
  submitBtn,
  deleteBtn,
  edit,
}: FormButtonsContainerProps) => {
  if (edit) {
    return (
      <div className="flex flex-col-reverse gap-3 md:flex-row">
        <div className="w-full md:w-6/12">{deleteBtn}</div>
        <div className="w-full md:w-6/12">{submitBtn}</div>
      </div>
    )
  }

  return <>{submitBtn}</>
}

export default FormButtonsContainer
