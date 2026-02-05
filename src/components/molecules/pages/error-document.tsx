import {
  BigTitle,
  Container,
  Icon,
  InfoIcon,
  Subtitle,
} from '@/components/atoms'

const getError = (error: any) => {
  try {
    return JSON.parse(error.message)
  } catch {
    return error
  }
}

const Error = ({ error: err }: { error: any }) => {
  const error = getError(err)

  return (
    <div className="min-h-screen flex items-center justify-center h-full w-full">
      <Container className="w-[95dvw] h-[95dvh] md:w-[75dvw] md:h-[50dvh] rounded-xl py-5 flex shadow-sm">
        <section
          className="border-accent flex rounded-xl flex-col w-full h-full items-center justify-center p-5 shadow-sm"
          style={{ borderWidth: '1px' }}
        >
          <header className="flex flex-col items-center justify-center gap-5 p-5">
            <BigTitle className="text-accent text-3xl mb-5 text-center">
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

export default Error
