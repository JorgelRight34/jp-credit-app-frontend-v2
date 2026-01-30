import {
  AccentBtn,
  ArrowBackIcon,
  BigTitle,
  HomeIcon,
  Paragraph,
  SecondaryBtn,
} from '@/components'

const Unauthorized = () => {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Lock SVG Icon */}
        <div className="mb-8 flex justify-center">
          <svg
            className="h-24 w-24 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Error Code */}
        <div className="mb-4">
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
            Error 401
          </span>
        </div>

        {/* Main Heading */}
        <BigTitle className="mb-6 text-3xl font-bold text-gray-900">
          Acceso Denegado
        </BigTitle>

        {/* Description */}
        <Paragraph className="leading-relaxed mb-6">
          No tienes permiso para acceder a este recurso. Por favor contactae a
          su administrador o regresar a una página a la que tenga acceso.
        </Paragraph>
        {/* Action Buttons */}
        <div className="space-y-3">
          <AccentBtn
            onClick={() => window.history.back()}
            className="mb-3 w-full rounded-lg"
            icon={ArrowBackIcon}
          >
            <span className="text-lg">Atrás</span>
          </AccentBtn>
          <SecondaryBtn
            onClick={() => (window.location.href = '/')}
            className="w-full rounded-lg !bg-white"
            icon={HomeIcon}
          >
            <span className="text-lg">Inicio</span>
          </SecondaryBtn>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
