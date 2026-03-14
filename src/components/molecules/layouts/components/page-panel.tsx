import { Panel } from '@/components/atoms'
import { PropsWithChildren } from 'react'

const PagePanel = ({ children }: PropsWithChildren) => {
  return (
    <section className="flex flex-col h-full pt-3">
      <Panel>{children}</Panel>
    </section>
  )
}

export default PagePanel
