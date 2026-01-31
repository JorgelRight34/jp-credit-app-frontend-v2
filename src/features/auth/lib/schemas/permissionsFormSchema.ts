import z from "zod";

export const permissionsFormSchema = z.object({
    username: z.string(),
    claims: z.string().array().default([]),
    roles: z.string().array().default([])
})

export type PermissionsFormValues = z.infer<typeof permissionsFormSchema>;