import { useMemo, useRef } from "react"
import { deleteProfilePhoto, uploadProfilePhoto } from "../services/profileClient"
import type { FileAttachmentsFormRef, UseDeferredFileAttachmentsFormReturn } from "@/components";
import type { Profile } from "../models/profile"

export const useProfileFileAttachmentsForm = ({ profile }: { profile?: Profile }): UseDeferredFileAttachmentsFormReturn<Profile> => {
    const profileRef = useRef<Profile | undefined>(profile);
    const formRef = useRef<FileAttachmentsFormRef>(null)

    const memoizedProfileFiles = useMemo(() => {
        return profile?.files ? profile.files : undefined
    }, [profile])

    return {
        form: {
            onUpload: (files) => uploadProfilePhoto(profileRef.current!.id, files[0]),
            onDelete: (files) => deleteProfilePhoto(files[0].id),
            filesMaxLength: 1,
            accept: "image/*",
            initialFiles: memoizedProfileFiles,
        },
        setRef: (value) => profileRef.current = value,
        submit: async (value) => {
            profileRef.current = value;
            await formRef.current?.submit();
        },

        formRef,

    };
}