import z from "zod";

export const changePasswordSchema = z.object({
    id: z.number(),
    password: z.string(),
    confirmation: z.string(),
})
    .refine((data) => data.password === data.confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["confirmation"],
    })

export type ChangePasswordSchemaType = z.infer<
    typeof changePasswordSchema
>;