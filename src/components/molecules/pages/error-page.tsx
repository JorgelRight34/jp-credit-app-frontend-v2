import {
  BigTitle,
  Container,
  Icon,
  InfoIcon,
  Subtitle,
} from '@/components/atoms'
import { IS_DEV_MODE } from '@/lib/utils'
import { isRedirect } from '@tanstack/react-router'

const getError = (error: any) => {
  try {
    return JSON.parse(error.message)
  } catch {
    return error
  }
}

const ErrorPage = ({ error: err }: { error: any }) => {
  if (IS_DEV_MODE) throw err
  if (isRedirect(err)) throw err

  const error = getError(err)

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <Container className="flex h-[95dvh] w-[95dvw] rounded-xl py-5 shadow-sm md:h-[50dvh] md:w-[75dvw]">
        <section
          className="border-accent flex h-full w-full flex-col items-center justify-center rounded-xl p-5 shadow-sm"
          style={{ borderWidth: '1px' }}
        >
          <header className="flex flex-col items-center justify-center gap-5 p-5">
            <BigTitle className="text-accent mb-5 text-center text-3xl">
              {error.status}
            </BigTitle>
            {/* Version info at bottom */}
            <Subtitle className="text-center">
              <Icon icon={InfoIcon} className="mr-2">
                {error.message}
              </Icon>
            </Subtitle>
          </header>
        </section>
      </Container>
    </div>
  )
}

export default ErrorPage
