import { FileModel } from "@/models/fileModel"
import { ProfileRole } from "../models/profileRole"
import { getProfilePicWithInitials } from "@/lib/utils/auth-utils"

export const profilesQueryKey = "profiles"

export const profileRoleLabelMap: Record<ProfileRole, string> = {
    loanOfficer: "agente",
    client: "cliente",
    guarantor: "garante",
    profile: "pérfil"
}

export const getDefaultProfilePicModel = (profile: { firstName: string, lastName: string }): FileModel => ({
    id: -1,
    isImage: true,
    url: getProfilePicWithInitials(profile),
    fileType: "png"
})