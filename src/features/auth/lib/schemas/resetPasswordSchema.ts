import z from "zod";

export const resetPasswordSchema = z.object({
    password: z.string(),
    confirmation: z.string(),
})
    .refine((data) => data.password === data.confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["confirmation"],
    })

export type ResetPassworFormValues = z.infer<typeof resetPasswordSchema>;