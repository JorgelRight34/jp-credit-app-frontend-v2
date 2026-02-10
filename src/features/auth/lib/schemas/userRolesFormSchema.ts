import z from "zod";

export const userRolesFormSchema = z.object({
    roles: z.string().array(),
    userId: z.number(),
    username: z.string(),
    userRoles: z.object({ normalizedName: z.string() }).array()
});

export type UserRolesFormValues = z.infer<typeof userRolesFormSchema>;