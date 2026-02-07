import { useMemo, useRef } from "react";
import { deleteCollateralFiles, uploadCollateralFiles } from "../services/collateralClient";
import type { Collateral } from "../models/collateral";
import type { FileAttachmentsFormRef, UseDeferredFileAttachmentsFormReturn } from "@/components";

export const useCollateralFileAttachmentForm = ({ collateral }: { collateral?: Collateral }): UseDeferredFileAttachmentsFormReturn<Collateral> => {
    const collateralRef = useRef<Collateral | undefined>(collateral);
    const formRef = useRef<FileAttachmentsFormRef>(null);

    const memoizedCollateralFiles = useMemo(() => collateral?.files, [collateral])

    return {
        form: {
            onUpload: (files) => uploadCollateralFiles(collateralRef.current!.id, files),
            onDelete: (files) => deleteCollateralFiles(files.map(f => f.id)),
            initialFiles: memoizedCollateralFiles,
            accept: "*"
        },
        setRef: (value) => collateralRef.current = value,
        submit: async (value) => {
            collateralRef.current = value;
            await formRef.current?.submit();
        },
        formRef
    }
}