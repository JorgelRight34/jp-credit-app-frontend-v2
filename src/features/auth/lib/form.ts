
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { generateUsername } from "./utils";
import { FormProvider } from "@/components";
import { LoginForm } from "../models/loginForm";


const updateUsernameOnForm = (
    { lastName, firstName }: UserFormValues,
    setValue: UseFormSetValue<UserFormValues>
) => {
    if (lastName && firstName) {
        setValue("username", generateUsername(firstName, lastName));
    }
};

const userSchema = z
    .object({
        username: z.string(),
        password: z.string().optional(),
        confirmation: z.string().optional(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
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

export type UserFormValues = z.infer<typeof userSchema>;

export const userFormProvider: FormProvider<UserFormValues> = {
    schema: userSchema,
    fields: [
        {
            name: "firstName",
            id: "firstName",
            label: "Nombres",
            watchedValues: ["lastName"],
            changeWhen: updateUsernameOnForm,
        },
        { name: "username", id: "username", label: "Username" },
        {
            name: "password",
            label: "Contraseña",
            disabledOnEdit: false,
            id: "password",
            type: "password",
        },
        {
            name: "lastName",
            id: "lastName",
            label: "Apellidos",
            watchedValues: ["firstName"],
            changeWhen: updateUsernameOnForm,
        },
        { name: "email", id: "email", label: "Email", type: "email" },

        {
            name: "confirmation",
            label: "Confirmar Contraseña",
            id: "confirmation",
            type: "password",
            disabledOnEdit: false,
        },
    ]
}

export const loginFormProvider: FormProvider<LoginForm> = {
    schema: z.object({
        username: z.string(),
        password: z.string()
    }),
    fields: [
        {
            label: "Usuario",
            id: "username",
            icon: { icon: "person", iconDirection: "right" },
            name: "username"
        },
        {
            label: "Contraseña",
            id: "password",
            type: "password",
            name: "password",
        },
    ]
}

export type LoginFormValues = z.infer<typeof loginFormProvider.schema>;

const changePasswordSchema = z.object({
    password: z.string(),
    confirmation: z.string(),
})
    .refine((data) => data.password === data.confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["confirmation"],
    })

export type ChangeUserPasswordValues = z.infer<
    typeof changePasswordSchema
>;

export const changePasswordFormProvider: FormProvider<ChangeUserPasswordValues> = {
    schema: changePasswordSchema,
    fields: [
        {
            name: "password",
            label: "Nueva Contraseña",
            id: "password",
            type: "password",
        },
        {
            name: "confirmation",
            label: "Confirmar Contraseña",
            id: "confirmation",
            type: "password",
        },
    ]
}

export const NO_PERMISSION = "";
