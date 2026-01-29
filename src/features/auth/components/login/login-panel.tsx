import LoginForm from './login-form'
import {
  BigTitle,
  Container,
  Icon,
  Image,
  InfoIcon,
  Subtitle,
} from '@/components'

const LoginPanel = () => {
  return (
    <main className="flex items-center justify-center border h-screen">
      <Container className="w-[95dvw] md:w-[75dvw] rounded-xl py-5 flex shadow-sm">
        <aside className="md:p-5 border-end hidden w-6/12 flex-col items-center justify-center p-3 md:flex">
          <section
            className="border-accent flex rounded-xl flex-col w-full h-full items-center justify-center p-5 shadow-sm"
            style={{ borderWidth: '1px' }}
          >
            <header className="flex flex-col items-center justify-center gap-5 p-5">
              <BigTitle className="text-accent text-3xl mb-5 text-center">
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
        <section className="md:p-5 flex w-full flex-col justify-center p-3 md:w-6/12">
          <figure className="flex justify-center">
            <Image
              className="img-fluid mb-3 hidden object-contain md:block"
              src="/horizontal-logo.png?url"
              alt="header"
            />
            <Image
              className="img-fluid mb-5 block object-contain md:hidden"
              src="/header.jpg?url"
              alt="header"
            />
          </figure>
          {/* Header section */}
          <header className="md:mb-3 mb-12 text-center">
            <Subtitle className="small mb-0">
              Ingresa tus credenciales para acceder al sistema.
            </Subtitle>
          </header>
          <LoginForm />
        </section>
      </Container>
    </main>
  )
}

export default LoginPanel
