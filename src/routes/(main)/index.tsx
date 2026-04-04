import { buildPageTitle, getFullName } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentUser } from './route'
import { BigTitle, Paragraph } from '@/components'

export const Route = createFileRoute('/(main)/')({
  head: () => ({ meta: [{ title: buildPageTitle('Index') }] }),
  component: App,
})

function App() {
  const user = useSuspenseCurrentUser()

  return (
    <section className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <Paragraph className="text-xs font-medium tracking-widest">
        PROYECTO
      </Paragraph>
      <BigTitle className="text-accent text-center !text-4xl font-medium">
        {user.projectName}
      </BigTitle>
      <div className="bg-foreground h-0.5 w-10" />
      <p className="text-muted-foreground">
        Bienvenido,{' '}
        <b className="text-foreground font-medium">{getFullName(user)}</b>
      </p>
    </section>
  )
}
