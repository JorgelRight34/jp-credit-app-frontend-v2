import clsx from "clsx";
import { SecondaryBtn } from "../../ui";
import AccentBtn from "../../ui/AccentBtn";
import { MouseEventHandler, ReactNode, useId } from "react";

export interface FormLayoutProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isDirty?: boolean;
  renderLayout?: boolean;
  showReset?: boolean;
  reset?: () => void;
  onSubmit?: () => void;
  onDelete?: MouseEventHandler;
}

/**
 * A layout component for entity forms that wraps its children with a form element.
 * It provides a submit button and an optional delete button.
 * @component
 * @param {FormLayoutProps} props - The props for the entity form layout component.
 * @param {ReactNode} props.children - The content to be displayed inside the layout.
 * @param {boolean} [props.allowDelete] - A boolean indicating whether the delete button should be shown.
 * @param {function} [props.onDelete] - A function to be called when the delete button is clicked.
 * @param {function} props.onSubmit - A function to be called when the form is submitted.
 * @returns {JSX.Element} The rendered entity form layout component.
 */
const FormLayout = ({
  children,
  isDirty = false,
  renderLayout = true,
  className,
  showReset = true,
  reset,
  onSubmit,
  onDelete,
}: FormLayoutProps) => {
  const formId = useId();

  if (renderLayout === false) return children;

  return (
    <form id={formId} className={clsx("flex h-full flex-col", className)}>
      <div className="flex h-full flex-1 flex-col pb-3">{children}</div>

      <div className="flex flex-shrink-0 md:justify-between">
        {showReset && (
          <div className="w-6/12 px-2">
            <SecondaryBtn
              disabled={!isDirty}
              type="button"
              className="w-full"
              onClick={reset}
            >
              Resetear
            </SecondaryBtn>
          </div>
        )}

        {onDelete && (
          <AccentBtn type="button" className="ml-3 w-full" onClick={onDelete}>
            Eliminar
          </AccentBtn>
        )}

        <div className={clsx("w-6/12", { "w-full": showReset === false })}>
          <AccentBtn
            disabled={!isDirty}
            type="button"
            className="w-full"
            onClick={onSubmit}
          >
            Ok
          </AccentBtn>
        </div>
      </div>
    </form>
  );
};

export default FormLayout;
