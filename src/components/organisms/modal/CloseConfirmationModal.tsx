import { ModalProps } from "../../models/modalProps";
import AccentBtn from "../ui/AccentBtn";
import SecondaryBtn from "../ui/SecondaryBtn";
import Modal from "./Modal";

interface CloseConfirmationModalProps extends ModalProps {
  onConfirm: () => void;
  onCancel?: () => void;
}

const CloseConfirmationModal = ({
  onHide,
  onConfirm,
  onCancel = onHide,
  ...props
}: CloseConfirmationModalProps) => {
  return (
    <Modal onHide={onHide} {...props} showCloseBtn={false}>
      {/* Modal Content */}
      <div className="text-center p-4">
        {/* Warning Icon */}
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 border-4 border-amber-200">
            <svg
              className="h-8 w-8 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3">¿Estás seguro?</h3>

        {/* Message */}
        <p className="text-gray-600 mb-3 leading-relaxed">
          Tienes cambios sin guardar. Si continúas, se perderán todos los
          cambios realizados.
        </p>

        {/* Action Buttons */}
        <div className="flex">
          <div className="w-6/12 pe-1">
            {/* Cancel Button */}
            <SecondaryBtn
              className="w-full"
              type="button"
              icon={"close"}
              onClick={onCancel}
            >
              Cancelar
            </SecondaryBtn>
          </div>

          <div className="w-6/12 ps-1">
            {/* Confirm Button */}
            <AccentBtn
              className="w-full"
              type="button"
              icon={"check"}
              onClick={onConfirm}
            >
              Sí, continuar
            </AccentBtn>
          </div>
        </div>

        {/* Additional Help Text */}
        <div className="mt-3 pt-3 border-top border-gray-100">
          <p className="text-sm text-gray-500">
            Asegúrate de guardar tus cambios antes de continuar
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CloseConfirmationModal;
