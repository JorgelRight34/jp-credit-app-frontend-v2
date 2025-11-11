import { useMemo } from "react";
import { DatatableFile } from "../models/datatableFile";
import { Tab, Tabs } from "@/components/Tabs";
import clsx from "clsx";
import FileExplorer from "./FileExplorer";
import {
  mapApiFileToDatatableFile,
  mapFileFormFieldValuesToDatatableFile,
  mapFileToDatatableFile,
} from "../lib/utils";
import { UseUploadFilesInputReturn } from "../models/useMultipleFilesInputProp";
import dayjs from "dayjs";

type FileFormExplorerProps = UseUploadFilesInputReturn & {
  showLimitWarning?: boolean;
  className?: string;
  accept?: string;
  title?: string;
  name?: string;
};

const sortDates = (a: DatatableFile, b: DatatableFile) =>
  dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();

const FileFormExplorer = ({
  upload,
  accept,
  name,
  remove,
  reachedLimit,
  className,
  showLimitWarning,
}: FileFormExplorerProps) => {
  const uploadedFiles = useMemo<DatatableFile[]>(
    () =>
      [
        ...upload.loaded.map(mapApiFileToDatatableFile),
        ...upload.created.map(mapFileFormFieldValuesToDatatableFile),
        ...upload.uploaded.map(mapFileToDatatableFile),
      ].sort(sortDates),
    [upload.created, upload.loaded, upload.uploaded],
  );

  const tableRemovedFiles = useMemo<DatatableFile[]>(
    () =>
      [
        ...remove.deleted.map(mapApiFileToDatatableFile),
        ...remove.removedFiles.map(mapFileToDatatableFile),
        ...remove.removedCreations.map(mapFileFormFieldValuesToDatatableFile),
      ].sort(sortDates),
    [remove.deleted, remove.removedCreations, remove.removedFiles],
  );

  return (
    <div className={clsx("flex h-full flex-col", className)}>
      <Tabs defaultActiveKey="uploaded" variation="minimal" navigate={false}>
        <Tab
          title={
            <label>
              <input
                type="file"
                className="hidden"
                name={name ?? ""}
                accept={accept}
                disabled={reachedLimit}
                onChange={upload.handleOnFileChange}
              />
              Subir
            </label>
          }
          icon="upload"
          disabled={reachedLimit}
        >
          <label>
            <input
              type="file"
              className="hidden"
              name={name ?? ""}
              accept={accept}
              disabled={reachedLimit}
              onChange={upload.handleOnFileChange}
            />
            <button type="button">Subir</button>
          </label>
        </Tab>
        <Tab path="uploaded" title="Ver Subidos" icon="download">
          <FileExplorer
            extraColumns={[
              {
                header: "Opciones",
                cell: ({ row }) => (
                  <span
                    className="text-accent"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove.removeFile(row.index, row.original.key);
                    }}
                  >
                    Borrar
                  </span>
                ),
              },
            ]}
            files={uploadedFiles}
          />
        </Tab>
        <Tab path="removed" title="Eliminados" icon="close">
          <FileExplorer
            extraColumns={[
              {
                header: "Opciones",
                cell: ({ row }) => (
                  <span
                    className="text-accent"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove.recoverFile(row.index, row.original.key);
                    }}
                  >
                    Recuperar
                  </span>
                ),
              },
            ]}
            files={tableRemovedFiles}
          />
        </Tab>
      </Tabs>
      {showLimitWarning && reachedLimit && (
        <span className="ml-3 text-red-500">Límite de archivos alcanzado</span>
      )}
    </div>
  );
};

export default FileFormExplorer;
