import { deleteCollateralFiles, uploadCollateralFiles } from "../services/collateralClient";
import type { Collateral } from "../models/collateral";
import { useDataFileAttachmentsForm, } from "@/components";
import { collateralsQueryKey } from "../lib/constants";

export const useCollateralFileAttachmentForm = ({ collateral }: { collateral?: Collateral } = {}) =>
    useDataFileAttachmentsForm({
        entity: collateral,
        getFiles: (c) => c?.files,
        formConfig: (ref) => ({
            onUpload: (files) => uploadCollateralFiles(ref.current!.id, files),
            onDelete: (files) => deleteCollateralFiles(ref.current!.id, files.map(f => f.publicId!)),
            keysToInvalidate: [[collateralsQueryKey]],
            accept: "*",
        }),
    });