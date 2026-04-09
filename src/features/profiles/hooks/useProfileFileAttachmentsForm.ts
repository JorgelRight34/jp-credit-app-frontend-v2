import { deleteProfilePhoto, uploadProfilePhoto } from "../services/profileClient"
import { useDataFileAttachmentsForm } from "@/components";
import type { Profile } from "../models/profile"
import { profilesQueryKey } from "../lib/constants";

export const useProfileFileAttachmentsForm = ({ profile }: { profile?: Profile } = {}) => {
    return useDataFileAttachmentsForm({
        entity: profile,
        getFiles: (p) => p?.files,
        formConfig: (ref) => ({
            onUpload: (files) => uploadProfilePhoto(ref.current!.id, files[0]),
            onDelete: (files) => deleteProfilePhoto(ref.current!.id, files[0].publicId!),
            keysToInvalidate: [[profilesQueryKey]],
            filesMaxLength: 1,
            accept: "image/*",
        }),
    });
}