import {
  AccentBtn,
  AddIcon,
  BigTitle,
  EmptyIcon,
  Icon,
  Link,
  Subtitle,
} from '@/components/atoms'
import { toTitleCase } from '@/lib/utils'

interface EmptyMessageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title?: string
  createPath?: string
}

const EmptyMessage = ({
  className,
  title = '',
  createPath,
}: EmptyMessageProps) => {
  return (
    <div className={className}>
      <div className="flex justify-center">
        <Icon icon={EmptyIcon} className="mx-auto mb-5 text-gray-700" />
      </div>
      <div className="mb-5">
        <BigTitle className="mb-3 text-center text-2xl font-semibold text-gray-800">
          No hay Datos {title}
        </BigTitle>
        <Subtitle className="leading-relaxed">
          No se encontraron datos para mostrar en este momento. Esto puede
          deberse a que no hay información disponible o los filtros aplicados no
          devuelven resultados.
        </Subtitle>
      </div>
      <div className="space-y-3">
        {createPath && (
          <Link to={createPath}>
            <AccentBtn className="w-100 py-2" icon={AddIcon}>
              Crear {toTitleCase(title)}
            </AccentBtn>
          </Link>
        )}
      </div>
    </div>
  )
}

export default EmptyMessage
