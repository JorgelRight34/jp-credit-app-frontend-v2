import { Panel } from '@/components/atoms'
import { PropsWithChildren } from 'react'

const PagePanel = ({ children }: PropsWithChildren) => {
  return (
    <section className="flex h-full flex-col pt-3">
      <Panel>{children}</Panel>
    </section>
  )
}

export default PagePanel
