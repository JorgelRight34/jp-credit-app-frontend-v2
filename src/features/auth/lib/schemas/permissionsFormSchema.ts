import z from "zod";

export const permissionsFormSchema = z.object({
    id: z.number(),
    claims: z.string().array().default([]),
    roles: z.string().array().default([])
})

export type PermissionsFormValues = z.infer<typeof permissionsFormSchema>;