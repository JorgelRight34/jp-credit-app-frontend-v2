
import { useMemo } from "react";
import { Profile } from "../models/profile";
import { deleteProfilePhoto, uploadProfilePhoto } from "../services/profilesClient";
import { UseFileFormProps } from "@/components/FileUpload/hooks/useUploadFileForm";

interface UseProfileFormProps {
    profile?: Profile;
}

export const useProfileFilesForm = ({ profile }: UseProfileFormProps): UseFileFormProps<Profile> => {
    const memoizedProfileFiles = useMemo(() => {
        return profile?.photo ? [profile.photo] : undefined
    }, [profile])

    return {
        onUpload: async (files, data) => uploadProfilePhoto(profile ? profile.id : data.id!, files[0]),
        onDelete: async (files, data) => deleteProfilePhoto(profile ? profile.id : data.id!, files[0].publicId!),
        editFiles: memoizedProfileFiles,
        defaultData: profile,
        filesMaxLength: 1,
        accept: "image/*"
    };
}