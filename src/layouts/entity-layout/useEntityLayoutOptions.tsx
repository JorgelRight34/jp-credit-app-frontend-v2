import { LayoutOption } from "./layoutOption";
import ChooseProjectBtn from "@/features/Projects/components/ChooseProjectBtn";
import { ModulePermissions } from "@/features/Auth/models/modulePermissions";

export interface UseEntityLayoutOptionsProps {
  extraOptions?: LayoutOption[];
  showChooseProjectBtn?: boolean;
  isEditDisabled?: boolean;
  deleteDisabledTooltip?: string;
  editDisabledTooltip?: string;
  isDeleteDisabled?: boolean;
  isCreateDisabled?: boolean;
  permissions?: ModulePermissions;
  onCreate?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
}

export const useEntityLayoutOptions = ({
  extraOptions = [],
  showChooseProjectBtn = false,
  editDisabledTooltip = "",
  deleteDisabledTooltip = editDisabledTooltip,
  isEditDisabled = false,
  isDeleteDisabled = isEditDisabled,
  isCreateDisabled = false,
  permissions,
  onCreate,
  onEdit,
  onDelete,
  onDownload,
}: UseEntityLayoutOptionsProps): LayoutOption[] => {
  const options: LayoutOption[] = [
    ...extraOptions,
    {
      title: "Editar",
      variation: "accent",
      icon: "edit",
      tooltip: editDisabledTooltip,
      disabled: isEditDisabled || !permissions?.canEdit,
      onClick: onEdit,
      show: !!onEdit,
    },
    {
      title: "Eliminar",
      variation: "accent",
      icon: "close",
      disabled: isDeleteDisabled || !permissions?.canDelete,
      onClick: onDelete,
      tooltip: deleteDisabledTooltip,
      show: !!onDelete,
    },
    {
      title: "Descargar",
      icon: "download",
      disabled: !permissions?.canView,
      onClick: onDownload,
      show: !!onDownload,
    },
    {
      title: "Proyecto",
      icon: "work",
      disabled: !permissions?.canView,
      onClick: onDownload,
      show: showChooseProjectBtn,
      component: ChooseProjectBtn,
    },
    {
      title: "Crear",
      variation: "accent",
      icon: "add",
      disabled: isCreateDisabled || !permissions?.canCreate,
      onClick: onCreate,
      show: !!onCreate,
    },
  ];

  return options;
};
