"use client";

import { useState } from "react";
import { FormPageLayoutProps } from "./FormPageLayout";
import { useFormPage } from "./useFormPage";
import EntityLayout from "../entity-layout/EntityLayout";
import { toAllTitleCase } from "@/utils/utils";
import { breadcrumbIcons } from "@/utils/constants";
import { ConfirmationModal } from "@/components";

const FormPageLayoutContent = ({
  title,
  edit,
  children,
  description,
  breadcrumbs = [],
  deleteConfirmationMessage = "",
  cacheKey,
  ...props
}: FormPageLayoutProps) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { onDelete } = useFormPage({ onDelete: props.onDelete });

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
        onDelete={edit ? () => setShowConfirmationModal(true) : undefined}
      >
        {children}
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

export default FormPageLayoutContent;
