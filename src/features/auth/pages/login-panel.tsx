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
    <main className="flex items-center bg-background justify-center border h-screen">
      <Container className="w-[95dvw] md:w-[75dvw] flex-row rounded-xl py-5 flex shadow-sm">
        <aside className="md:p-5 border-end hidden w-6/12 flex-col items-center justify-center p-3 md:flex">
          <section
            className="border-accent flex rounded-xl flex-col w-full h-full items-center justify-center p-5 shadow-sm"
            style={{ borderWidth: '1px' }}
          >
            <header className="flex flex-col items-center justify-center gap-5 p-5">
              <BigTitle className="text-accent text-4xl mb-5 text-center">
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
        <section className="md:p-5 flex w-full flex-col justify-center md:w-6/12">
          <figure className="flex justify-center">
            <AppHorizontalLogo
              alt="header"
              className="mb-5 block object-contain h-32"
            />
          </figure>
          {/* Header section */}
          <header className="md:mb-3 mb-12 text-center">
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
