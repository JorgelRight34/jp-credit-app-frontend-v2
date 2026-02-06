import { useMemo, useRef } from "react"
import { deleteProfilePhoto, uploadProfilePhoto } from "../services/profileClient"
import type { FileAttachmentsFormRef, UseDeferredFileAttachmentsFormReturn } from "@/components";
import type { Profile } from "../models/profile"

export const useProfileFileAttachmentsForm = ({ profile }: { profile?: Profile }): UseDeferredFileAttachmentsFormReturn<Profile> => {
    const profileRef = useRef<Profile | undefined>(profile);
    const formRef = useRef<FileAttachmentsFormRef>(null)

    const memoizedProfileFiles = useMemo(() => {
        return profile?.photo ? [profile.photo] : undefined
    }, [profile])

    return {
        form: {
            onUpload: (files) => uploadProfilePhoto(profileRef.current!.id, files[0]),
            onDelete: (files) => deleteProfilePhoto(profileRef.current!.id, files[0].publicId!),
            filesMaxLength: 1,
            accept: "image/*",
            initialFiles: memoizedProfileFiles,
        },
        setRef: (value: Profile | undefined) => profileRef.current = value,
        submit: async (value: Profile | undefined) => {
            profileRef.current = value;
            await formRef.current?.submit();
        },

        formRef,

    };
}