import { getFullName, toAllTitleCase } from "@/lib/utils/utils"
import { LoanMembers } from "../models/loanMembers"
import { SelectOptions } from "@/models"

export const getLoanMembersSelectOptions = ({ client, guarantor, loanOfficer }: LoanMembers): SelectOptions => {
    const members = [client, guarantor, loanOfficer].filter(el => el);

    return members.map(member => [member!.profileId, toAllTitleCase(getFullName(member?.profile)) as string]);
}