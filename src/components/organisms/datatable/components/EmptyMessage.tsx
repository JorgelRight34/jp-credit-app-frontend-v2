import { AccentBtn, AppLink, Icon } from "@/components/ui";
import { toTitleCase } from "@/utils/utils";

interface EmptyMessageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title: string;
  createPath?: string;
}

const EmptyMessage = ({
  className = "",
  title = "",
  createPath,
}: EmptyMessageProps) => {
  return (
    <div className={className}>
      <div className="flex justify-center">
        <Icon
          icon={"battery_android_frame_1"}
          className="mx-auto mb-5 text-gray-700"
        />
      </div>

      <div className="mb-5">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-3">
          No hay Datos {title}
        </h1>
        <p className="text-gray-600 leading-relaxed">
          No se encontraron datos para mostrar en este momento. Esto puede
          deberse a que no hay información disponible o los filtros aplicados no
          devuelven resultados.
        </p>
      </div>
      <div className="space-y-3">
        {createPath && (
          <AppLink to={createPath}>
            <AccentBtn className="py-2 w-100" icon={"add"}>
              Crear {toTitleCase(title)}
            </AccentBtn>
          </AppLink>
        )}
      </div>
    </div>
  );
};

export default EmptyMessage;
