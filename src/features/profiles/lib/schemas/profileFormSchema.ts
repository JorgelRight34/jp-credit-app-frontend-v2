import z from "zod";

export const profileFormSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede exceder 50 caracteres")
        .regex(
            /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/,
            "El nombre solo puede contener letras, espacios, guiones y apóstrofes",
        ),

    lastName: z
        .string()
        .trim()
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .max(50, "El apellido no puede exceder 50 caracteres")
        .regex(
            /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/,
            "El apellido solo puede contener letras, espacios, guiones y apóstrofes",
        ),

    email: z
        .email("El correo electrónico no tiene un formato válido")
        .optional(),

    gender: z
        .string()
        .min(1, "El género es obligatorio"),

    dateOfBirth: z
        .union([z.string(), z.date()])
        .optional()
        .refine(
            (val) => {
                if (!val) return true;
                const date = typeof val === "string" ? new Date(val) : val;
                return !isNaN(date.getTime());
            },
            { message: "La fecha de nacimiento no es válida" },
        )
        .refine(
            (val) => {
                if (!val) return true;
                const date = typeof val === "string" ? new Date(val) : val;
                return date <= new Date();
            },
            { message: "La fecha de nacimiento no puede ser futura" },
        ),

    maritalStatus: z
        .string()
        .min(1, "El estado civil no puede estar vacío")
        .optional(),

    dni: z
        .string()
        .regex(/^\d{11}$/, "La cédula debe contener exactamente 11 dígitos"),

    address: z
        .string()
        .trim()
        .min(5, "La dirección debe tener al menos 5 caracteres")
        .max(150, "La dirección no puede exceder 150 caracteres")
        .optional(),

    landline: z
        .string()
        .regex(/^\d{10}$/, "El teléfono fijo debe tener 10 dígitos")
        .optional(),

    officePhone: z
        .string()
        .regex(/^\d{10}$/, "El teléfono de oficina debe tener 10 dígitos")
        .optional(),

    phoneNumber: z
        .string()
        .regex(/^\d{10}$/, "El número de celular debe tener 10 dígitos")
        .optional(),
});


export type ProfileFormValues = z.infer<typeof profileFormSchema>;