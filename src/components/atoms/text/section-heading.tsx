import { PropsWithChildren } from 'react'

const SectionHeading = ({ children }: PropsWithChildren) => {
  return (
    <span className="truncate text-center text-accent text-4xl">
      {children}
    </span>
  )
}

export default SectionHeading
