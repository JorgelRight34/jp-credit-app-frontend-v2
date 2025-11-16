import { MediumTitle } from "@/components/atoms";
import { FileUploads } from "../hooks/useUploadFilesInput";
import { DatatableFile } from "../models/datatableFile";
import FileExplorer from "./FileExplorer";
import DataTableOption from "../../datatable/components/DataTableOption";

interface FileFormExplorerTabContentProps {
  createdLabel: string;
  deletedLabel: string;
  created: DatatableFile[];
  deleted: DatatableFile[];
  onRemove: (index: number, key: keyof FileUploads) => void;
  onRecover: (index: number, key: keyof FileUploads) => void;
}

const FileFormExplorerTabContent = ({
  createdLabel,
  deletedLabel,
  created,
  deleted,
  onRemove,
  onRecover,
}: FileFormExplorerTabContentProps) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      <section className="rounded-xl border bg-white/60 p-4 shadow-sm dark:bg-slate-900/40">
        <MediumTitle className="mb-3 text-lg font-semibold tracking-wide">
          {createdLabel}
        </MediumTitle>
        <FileExplorer
          extraColumns={[
            {
              header: "Opciones",
              cell: ({ row }) => (
                <DataTableOption
                  onClick={() => onRemove(row.index, row.original.key)}
                >
                  Remover
                </DataTableOption>
              ),
            },
          ]}
          files={created}
        />
      </section>
      <div className="h-px bg-slate-300 dark:bg-slate-700" />
      <section className="rounded-xl border bg-white/60 p-4 shadow-sm dark:bg-slate-900/40">
        <MediumTitle className="mb-3 text-lg font-semibold tracking-wide">
          {deletedLabel}
        </MediumTitle>
        <FileExplorer
          extraColumns={[
            {
              header: "Opciones",
              cell: ({ row }) => (
                <DataTableOption
                  onClick={() => onRecover(row.index, row.original.key)}
                >
                  Recuperar
                </DataTableOption>
              ),
            },
          ]}
          files={deleted}
        />
      </section>
    </div>
  );
};

export default FileFormExplorerTabContent;
