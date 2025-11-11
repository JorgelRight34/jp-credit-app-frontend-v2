import { breadcrumbIcons } from "@/utils/constants";
import Unauthorized from "../../pages/Unathorized";
import { toAllTitleCase } from "../../utils/utils";
import EntityLayout, { EntityLayoutProps } from "../EntityLayout/EntityLayout";
import { CacheKey } from "@/models";
import { useFormPage } from "./useFormPage";
import { ConfirmationModal } from "@/components/Modal";
import { useState } from "react";
import { ConfirmationModalProps } from "@/components/Modal/ConfirmationModal";
import { LoadingSpinner } from "@/components/ui";

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
  breadcrumbs = [],
  permissionsProvider,
  deleteConfirmationMessage = "",
  description,
  cacheKey,
  isLoading: isFetchingEntityToEdit,
  ...props
}: FormLayoutPageProps) => {
  const { permissions, isLoading, onDelete } = useFormPage({
    permissionsProvider,
    onDelete: props.onDelete,
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const isAuthorized = () =>
    (edit && permissions?.canEdit) || (!edit && permissions?.canCreate);

  if (isLoading) return null;
  if (!isAuthorized()) return <Unauthorized />;

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
