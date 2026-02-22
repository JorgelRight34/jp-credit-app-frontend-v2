import { ReactNode } from 'react'

interface DetailRowProps {
  title: ReactNode
  subtitle: ReactNode
}

const DetailRowProps = ({ title, subtitle }: DetailRowProps) => {
  return (
    <header className="border-b flex justify-between">
      <span>{title}</span>
      <b className="truncate">{subtitle}</b>
    </header>
  )
}

export default DetailRowProps
