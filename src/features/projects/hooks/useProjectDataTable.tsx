import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Project } from "../models/project";
import { UseDataTableReturn } from "../../../components/DataTable/models/useDataTableReturn";
import SecondaryBtn from "../../../components/ui/SecondaryBtn";
import { useCurrentProject } from "../../../contexts/ProjectContext";
import { toast } from "react-toastify";
import { showColumnsIfAssertion } from "../../../utils/utils";

interface UseProjectDataTableProps {
  toast?: boolean;
  allowSelect?: boolean;
}

const useProjectDataTable = ({
  toast: showToast = false,
  allowSelect = true,
}: UseProjectDataTableProps): UseDataTableReturn<Project> => {
  const { chooseProject, projectId, deselectProject } = useCurrentProject();

  const handleChooseProject = (project: Project) => {
    chooseProject(project);
    if (showToast) toast.success(`Ahora ${project.name} es el proyecto actual`);
  };

  const handleDeselectProject = (project: Project) => {
    deselectProject(project);
    if (showToast) toast.success(`${project.name} deseleccionado`);
  };

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      { accessorKey: "id", header: "Id", enableSorting: true },
      { accessorKey: "name", header: "Nombre", enableSorting: true },
      { accessorKey: "loanCount", header: "Préstamos", enableSorting: true },
      {
        accessorKey: "collateralCount",
        header: "Garantias",
        enableSorting: true,
      },
      ...showColumnsIfAssertion<Project>(allowSelect, [
        {
          id: "select",
          header: "Opciones",
          cell: ({ row }) => {
            const isSelected = row.original.id === projectId;

            return (
              <SecondaryBtn
                onClick={(e) => {
                  e.stopPropagation();
                  isSelected
                    ? handleDeselectProject(row.original)
                    : handleChooseProject(row.original);
                }}
              >
                {isSelected ? "Deseleccionar" : "Seleccionar"}
              </SecondaryBtn>
            );
          },
        },
      ]),
    ],
    [projectId]
  );

  return { columns, onRowClick: undefined };
};

export default useProjectDataTable;
