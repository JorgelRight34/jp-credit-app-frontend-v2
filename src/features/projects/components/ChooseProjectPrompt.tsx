import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChooseProjectBtn from "./ChooseProjectBtn";
import { faFolderOpen, faPlus } from "@fortawesome/free-solid-svg-icons";
import AccentBtn from "../../../components/ui/AccentBtn";
import { Link } from "react-router";

const ChooseProjectPrompt = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="flex justify-center">
        <FontAwesomeIcon
          icon={faFolderOpen}
          className="mx-auto mb-5 text-gray-700"
          size="5x"
        />
      </div>

      <div className="mb-5">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-3">
          Selecciona un Proyecto
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Para ver préstamos, garantías y transacciones, necesitas seleccionar
          un proyecto primero. Los proyectos te ayudan a organizar tu portafolio
          crediticio por categorías como préstamos de vehículos, préstamos
          personales o préstamos comerciales.
        </p>
      </div>
      <div className="space-y-3">
        <ChooseProjectBtn
          className="btn-accent py-2 w-100 mb-3"
          text="Seleccionar Proyecto"
          textClassName="text-1xl"
        />
        <Link to={"/projects/create"} className="link-reset">
          <AccentBtn className="py-2 w-100" icon={faPlus}>
            Crear Proyecto
          </AccentBtn>
        </Link>
      </div>
    </div>
  );
};

export default ChooseProjectPrompt;
