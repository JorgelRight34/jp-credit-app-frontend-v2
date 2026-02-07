import z from "zod";

export const collateralFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "El título debe tener al menos 2 caracteres")
        .max(80, "El título no puede exceder 80 caracteres"),

    description: z
        .string()
        .trim()
        .min(5, "La descripción debe tener al menos 5 caracteres")
        .max(500, "La descripción no puede exceder 500 caracteres"),

    value: z
        .union([z.string().transform((val) => +val), z.number()])
        .refine((val) => Number.isFinite(val), "El valor no es válido")
        .refine((val) => val > 0, "El valor debe ser mayor que 0"),

    condition: z
        .string()
        .trim()
        .min(1, "La condición es obligatoria")
        .max(40, "La condición no puede exceder 40 caracteres"),

    status: z
        .string()
        .trim()
        .min(1, "El estado es obligatorio")
        .max(40, "El estado no puede exceder 40 caracteres"),

    type: z
        .string()
        .trim()
        .min(1, "El tipo es obligatorio")
        .max(40, "El tipo no puede exceder 40 caracteres"),

    location: z
        .string()
        .trim()
        .min(2, "La ubicación debe tener al menos 2 caracteres")
        .max(120, "La ubicación no puede exceder 120 caracteres")
        .optional(),

    expirationDate: z
        .string()
        .trim()
        .optional()
        .refine(
            (val) => !val || !Number.isNaN(new Date(val).getTime()),
            "La fecha de expiración no es válida",
        ),

    ownerId: z.number().refine(val => val > 0, "Debes selecionar un propietario"),

    loanId: z.number().refine(val => val > 0, "Debes selecionar un préstamo")
});

export type CollateralFormValues = z.infer<typeof collateralFormSchema>;