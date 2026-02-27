import { PropsWithChildren } from 'react'

const FinanceSectionLayout = ({ children }: PropsWithChildren) => {
  return <section className="flex">{children}</section>
}

FinanceSectionLayout.Main = ({ children }: PropsWithChildren) => {
  return <div className="w-7/12">{children}</div>
}

FinanceSectionLayout.Secondary = ({ children }: PropsWithChildren) => {
  return <div className="w-4/12">{children}</div>
}

export default FinanceSectionLayout
