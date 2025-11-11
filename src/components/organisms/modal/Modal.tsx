import AccentBtn from "../ui/AccentBtn";
import "./modal.css";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Icon } from "../ui";
import { ModalProps } from "./modalProps";

/**
 * A modal component that displays a title and content, with a close button.
 * The modal is shown or hidden based on the `show` prop.
 * It can be used to display additional information or actions to the user.
 */
const Modal = ({
  children,
  title,
  show,
  showCloseBtn = true,
  onHide,
  width = "50dvw",
  height = "95dvh",
  icon,
  className = "",
}: ModalProps & React.PropsWithChildren) => {
  const isVisible = useMemo(() => show, [show]);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isVisible) setHasOpened(true);
  }, [isVisible]);

  if (!isVisible && !hasOpened) return null;

  return (
    <div
      className={clsx(`modal-overlay`, {
        "!hidden": !isVisible,
      })}
      onClick={onHide}
    >
      <div
        className={`my-modal rounded-3 flex flex-col p-3`}
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-bottom flex flex-shrink-0 items-center pb-3">
          <Icon
            labelClassName="!text-2xl"
            wrapperClassName="mb-0 mr-auto"
            icon={icon}
            label={title}
          />
          {showCloseBtn && (
            <AccentBtn
              type="button"
              onClick={onHide}
              className="ml-auto"
              icon="close"
            >
              Cerrar
            </AccentBtn>
          )}
        </div>
        <div
          className={clsx(
            `my-modal-content flex-1 overflow-y-auto p-3`,
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
