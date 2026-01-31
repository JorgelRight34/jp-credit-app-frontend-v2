import z from "zod";

export const changePasswordSchema = z.object({
    username: z.string(),
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