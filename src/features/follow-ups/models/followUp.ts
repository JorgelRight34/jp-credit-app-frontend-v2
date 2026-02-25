import { ProfileSummary } from "@/features/profiles";

export interface FollowUp {
    id: number;
    title: string;
    loanId: number;
    client: ProfileSummary;
    body: string;
    date: string
}