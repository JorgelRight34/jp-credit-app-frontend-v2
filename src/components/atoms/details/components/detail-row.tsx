import { ReactNode } from 'react'

interface DetailRowProps {
  title: ReactNode
  subtitle: ReactNode
}

const DetailRowProps = ({ title, subtitle }: DetailRowProps) => {
  return (
    <header className="border-b flex justify-between">
      <span className="text-secondary">{title}</span>
      <span className="text-primary font-bold truncate">{subtitle}</span>
    </header>
  )
}

export default DetailRowProps
