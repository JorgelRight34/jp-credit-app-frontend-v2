import z from "zod";

export const roleFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "El nombre del rol debe tener al menos 2 caracteres")
        .max(50, "El nombre del rol no puede exceder 50 caracteres")
        .regex(
            /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 _-]+$/,
            "El nombre del rol solo puede contener letras, números, espacios, guiones y guiones bajos",
        ),
});

export type RoleFormSchemaValues = z.infer<typeof roleFormSchema>;