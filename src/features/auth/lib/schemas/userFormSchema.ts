import z from "zod";

const usernameField = z
    .string()
    .trim()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(30, "El nombre de usuario no puede exceder 30 caracteres")
    .regex(
        /^[a-zA-Z0-9._-]+$/,
        "El nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos",
    );

const firstNameField = z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(
        /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/,
        "El nombre solo puede contener letras, espacios, guiones y apóstrofes",
    );

const lastNameField = z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(80, "El apellido no puede exceder 80 caracteres")
    .regex(
        /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/,
        "El apellido solo puede contener letras, espacios, guiones y apóstrofes",
    );

const emailField = z
    .string()
    .trim()
    .min(1, "El correo electrónico es obligatorio")
    .email("El correo electrónico no tiene un formato válido");

const withUsernameTransform = <T extends z.ZodObject<{ firstName: z.ZodString; lastName: z.ZodString }>>(schema: T) =>
    schema.transform((data) => {
        const { firstName, lastName } = data;
        if (!firstName || !lastName) return data;
        const username = `${firstName[0]}${lastName.split(" ")[0]}`.toLowerCase();
        return { ...data, username };
    });

const baseUserFields = {
    username: usernameField,
    firstName: firstNameField,
    lastName: lastNameField,
    email: emailField,
    isActive: z.boolean().optional(),
};

export const userFormSchema = withUsernameTransform(
    z.object({
        ...baseUserFields,
        password: z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(128, "La contraseña no puede exceder 128 caracteres")
            .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
            .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
            .regex(/[0-9]/, "La contraseña debe contener al menos un número")
            .regex(/[^A-Za-z0-9]/, "La contraseña debe contener al menos un carácter especial"),
        confirmation: z.string().min(1, "Debes confirmar la contraseña"),
    }).refine((data) => data.password === data.confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["confirmation"],
    })
);

export const userEditFormSchema = withUsernameTransform(
    z.object(baseUserFields)
);

export type UserFormValues = z.infer<typeof userFormSchema>;
export type UserEditFormValues = z.infer<typeof userEditFormSchema>;