import z from "zod";

export const loanSettingsFormSchema = z.object({ status: z.string() })

export type LoanSettingsFormValues = z.infer<typeof loanSettingsFormSchema>;