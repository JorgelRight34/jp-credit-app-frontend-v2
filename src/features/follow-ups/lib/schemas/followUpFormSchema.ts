import z from "zod";

export const followUpFormSchema = z.object({
    title: z.string(),
    body: z.string(),
    loanId: z.number()
})

export type FollowUpFormValues = z.infer<typeof followUpFormSchema>;