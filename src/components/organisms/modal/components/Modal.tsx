import "./modal.css";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ModalProps } from "../models/modalProps";
import { AccentBtn, Icon } from "@/components/atoms";

const Modal = ({
  children,
  title,
  show,
  showCloseBtn = true,
  width = "50dvw",
  height = "95dvh",
  icon,
  className = "",
  onHide,
}: ModalProps & React.PropsWithChildren) => {
  const [hasMountedOnce, setHasMountedOnce] = useState(show);

  useEffect(() => {
    if (show)
      setTimeout(() => {
        setHasMountedOnce(true);
      }, 0);
  }, [show]);

  if (!hasMountedOnce && !show) return null;

  return (
    <div
      className={clsx("modal-overlay", {
        "pointer-events-auto opacity-100": show,
        "pointer-events-none opacity-0": !show,
      })}
      onClick={onHide}
    >
      <div
        className="my-modal rounded-3 flex flex-col p-3"
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
            "my-modal-content flex-1 overflow-y-auto p-3",
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
