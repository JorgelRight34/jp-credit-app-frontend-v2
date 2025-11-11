import { ReactNode, useState } from "react";
import Modal from "../Modal/Modal";
import { CacheKey } from "@/models";
import { AccentBtn, SecondaryBtn } from "../ui";
import Input from "../EntityForm/inputs/Input";
import clsx from "clsx";
import { useDataMutation } from "@/hooks/useMutate";
import { useDataClient } from "@/hooks/useDataClient";
import { ModalProps } from "./modalProps";

export type ConfirmationModalProps = ModalProps & {
  title?: string;
  onConfirm: () => void;
  confirmationMessage: string;
  cacheKey?: CacheKey;
  destructive?: boolean; // For dangerous actions (delete, remove, etc.)
  confirmText?: string; // Custom confirm button text
  cancelText?: string; // Custom cancel button text
  description?: string | ReactNode; // Additional description text
};

const ConfirmationModal = ({
  title = "Confirmar Acción",
  confirmationMessage = "",
  onConfirm,
  destructive = false,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onHide,
  description,
  cacheKey,
  ...props
}: ConfirmationModalProps) => {
  const [input, setInput] = useState("");

  const dataClient = useDataClient();
  const { mutateAsync } = useDataMutation({
    mutationFn: async () => {
      return await onConfirm();
    },
    onSuccess: () => {
      dataClient.invalidateQueries({ queryKey: cacheKey });
    },
  });

  const isInputValid = () => {
    return (
      input.trim().toLowerCase() === confirmationMessage.trim().toLowerCase()
    );
  };

  const handleConfirm = async () => {
    if (!isInputValid()) return;
    await mutateAsync();
  };

  return (
    <Modal onHide={onHide} {...props} title={title}>
      <div className="mb-5 space-y-3">
        {/* Instruction text */}
        <div>
          <p className="mb-3">
            <strong>
              Para proceder, escriba exactamente el siguiente texto:
            </strong>
          </p>

          {/* Confirmation message display */}
          <div
            className={clsx(`rounded border p-3`, {
              "bg-danger-subtle border-danger-subtle text-danger-emphasis":
                destructive,
              "bg-warning-subtle border-warning-subtle text-warning-emphasis":
                !destructive,
            })}
          >
            <code className="font-bold select-none">{confirmationMessage}</code>
          </div>
        </div>

        {/* Optional description */}
        {description && (
          <div>
            <p className="mb-5 text-gray-500">{description}</p>
          </div>
        )}

        {/* Input field */}
        <div>
          <Input
            placeholder="Escriba el texto de confirmación..."
            value={input}
            onChange={setInput}
            error={isInputValid()}
            className="w-full"
            autoFocus
          />
          {input && !isInputValid() && (
            <div className="text-red-500">
              El texto no coincide con el mensaje de confirmación
            </div>
          )}
        </div>
      </div>

      {/* Modal Footer with Action Buttons */}
      <div className="mt-auto flex flex-shrink-0">
        <div className="w-6/12 pr-1">
          <SecondaryBtn
            className="w-full"
            onClick={() => {
              setInput("");
              onHide();
            }}
          >
            {cancelText}
          </SecondaryBtn>
        </div>
        <div className="w-6/12 pl-1">
          <AccentBtn
            className="w-full"
            disabled={!isInputValid()}
            onClick={handleConfirm}
          >
            {confirmText}
          </AccentBtn>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
