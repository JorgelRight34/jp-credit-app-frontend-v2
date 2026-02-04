import z from "zod";

export const userFormSchema = z
    .object({
        username: z.string(),
        password: z.string().optional(),
        confirmation: z.string().optional(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        isActive: z.boolean().optional()
    })
    .refine((data) => data.password === data.confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["confirmation"],
    })
    .transform((data) => {
        const { firstName, lastName } = data;
        if (!firstName || !lastName) return data;

        const username = `${firstName[0]}${lastName.split(" ")[0]}`.toLowerCase();

        return { ...data, username };
    })

export type UserFormValues = z.infer<typeof userFormSchema>;