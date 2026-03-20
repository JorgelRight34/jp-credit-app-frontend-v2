import LoginForm from '../components/login-form'
import {
  AppHorizontalLogo,
  BigTitle,
  Container,
  Icon,
  InfoIcon,
  Subtitle,
} from '@/components'
import { useRouter } from '@/hooks/useRouter'

const LoginPanel = () => {
  const router = useRouter()

  return (
    <main className="bg-background block h-[100dvh] items-center justify-center md:flex">
      <Container className="flex h-full w-full flex-row rounded-xl py-5 shadow-sm md:h-auto md:w-[75dvw]">
        <aside className="border-end hidden w-6/12 flex-col items-center justify-center p-3 md:flex md:p-5">
          <section
            className="border-accent flex h-full w-full flex-col items-center justify-center rounded-xl p-5 shadow-sm"
            style={{ borderWidth: '1px' }}
          >
            <header className="flex flex-col items-center justify-center gap-5 p-5">
              <BigTitle className="text-accent mb-5 text-center">
                Sistema de Crédito Empresarial
              </BigTitle>
              {/* Version info at bottom */}
              <Subtitle className="text-center">
                <small>
                  <Icon icon={InfoIcon} className="mr-2">
                    Versión 1.0.0
                  </Icon>
                </small>
              </Subtitle>
            </header>
          </section>
        </aside>
        <section className="flex w-full flex-col justify-center md:w-6/12 md:p-5">
          <figure className="flex justify-center">
            <AppHorizontalLogo
              alt="header"
              className="mb-5 block h-32 object-contain"
            />
          </figure>
          {/* Header section */}
          <header className="mb-12 text-center md:mb-3">
            <Subtitle className="small mb-0">
              Ingresa tus credenciales para acceder al sistema.
            </Subtitle>
          </header>
          <LoginForm
            onSuccess={() => {
              router.navigate({ to: '/' })
            }}
          />
        </section>
      </Container>
    </main>
  )
}

export default LoginPanel
