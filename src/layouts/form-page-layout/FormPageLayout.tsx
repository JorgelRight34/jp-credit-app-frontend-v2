import { CacheKey } from "@/models";
import { useFormPage } from "./useFormPage";
import { useState } from "react";
import EntityLayout, { EntityLayoutProps } from "../entity-layout/EntityLayout";
import {
  ConfirmationModal,
  ConfirmationModalProps,
  LoadingSpinner,
} from "@/components";
import { toAllTitleCase } from "@/utils/utils";
import { breadcrumbIcons } from "@/utils/constants";

type FormLayoutPageProps = React.PropsWithChildren &
  EntityLayoutProps &
  Partial<ConfirmationModalProps> & {
    title: string;
    edit: boolean;
    cacheKey?: CacheKey;
    deleteConfirmationMessage?: string;
    isLoading: boolean;
  };

const FormLayoutPage = ({
  title,
  edit,
  children,
  description,
  breadcrumbs = [],
  permissionsProvider,
  deleteConfirmationMessage = "",
  cacheKey,
  isLoading: isFetchingEntityToEdit,
  ...props
}: FormLayoutPageProps) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { permissions, isLoading, onDelete } = useFormPage({
    permissionsProvider,
    onDelete: props.onDelete,
  }); // MVOE TO SERVER SIDE

  const isAuthorized = () =>
    (edit && permissions?.canEdit) || (!edit && permissions?.canCreate);

  if (isLoading) return null;
  if (!isAuthorized()) throw Error();

  return (
    <>
      <EntityLayout
        {...props}
        title={toAllTitleCase((edit ? `editar` : "crear") + " " + title)}
        breadcrumbs={[
          ...breadcrumbs,
          {
            title: edit ? "Editar" : "Crear",
            icon: breadcrumbIcons[edit ? "edit" : "create"],
          },
        ]}
        onDelete={
          edit && onDelete ? () => setShowConfirmationModal(true) : undefined
        }
      >
        {isFetchingEntityToEdit ? <LoadingSpinner /> : children}
      </EntityLayout>
      {onDelete && edit && (
        <ConfirmationModal
          height="auto"
          destructive={true}
          show={showConfirmationModal}
          onHide={() => setShowConfirmationModal(false)}
          description={description}
          onConfirm={onDelete}
          cacheKey={cacheKey}
          confirmationMessage={deleteConfirmationMessage}
        />
      )}
    </>
  );
};

export default FormLayoutPage;
