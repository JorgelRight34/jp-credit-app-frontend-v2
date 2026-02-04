import z from "zod";

export const userRolesFormSchema = z.object({
    roles: z.string().array(),
});

export type UserRolesFormValues = z.infer<typeof userRolesFormSchema>;