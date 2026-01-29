import { AccentBtn, AppLink, Icon, Subtitle } from "@/components";
import ChooseProjectBtn from "./ChooseProjectBtn";

const ChooseProjectPrompt = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="flex justify-center">
        <Icon icon="folder_open" className="mx-auto mb-5 text-gray-700" />
      </div>
      <header className="mb-5">
        <h1 className="mb-3 text-center text-2xl font-semibold text-gray-800">
          Selecciona un Proyecto
        </h1>
        <Subtitle className="leading-relaxed text-gray-600">
          Para ver préstamos, garantías y transacciones, necesitas seleccionar
          un proyecto primero. Los proyectos te ayudan a organizar tu portafolio
          crediticio por categorías como préstamos de vehículos, préstamos
          personales o préstamos comerciales.
        </Subtitle>
      </header>
      <div className="space-y-3">
        <ChooseProjectBtn
          className="btn-accent text-1xl mb-3 w-100 py-2"
          text="Seleccionar Proyecto"
        />
        <AppLink to={"/projects/create"} className="link-reset">
          <AccentBtn className="w-100 py-2" icon="add">
            Crear Proyecto
          </AccentBtn>
        </AppLink>
      </div>
    </div>
  );
};

export default ChooseProjectPrompt;
