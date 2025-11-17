import { UseUploadFileFormProps } from "@/components";
import { Collateral } from "../models/collateral";
import { deleteCollateralFiles, uploadCollateralFiles } from "../services/collateralsClient";
import { useMemo } from "react";

interface UseCollateralFilesFormProps {
    collateral?: Collateral;
}

export const useCollateralFilesForm = ({ collateral }: UseCollateralFilesFormProps):
    UseUploadFileFormProps<Collateral> => {
    const memoizedEditFiles = useMemo(
        () => [...(collateral?.files.map(f => f.fileUpload) ?? []), ...(collateral?.photos ?? [])], [collateral]
    )

    return {
        onUpload: async (files, data) => uploadCollateralFiles(collateral ? collateral.id : data.id!, files),
        onDelete: async (files) => deleteCollateralFiles(files),
        initialFiles: memoizedEditFiles,
        defaultData: collateral,
        filesMaxLength: 1,
        accept: "image/*"
    };
}