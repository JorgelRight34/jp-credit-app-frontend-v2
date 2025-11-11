
import { z } from "zod";
import { User } from "../models/user";
import { FormProvider } from "@/components/EntityForm/models/formProvider";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { generateUsername } from "./utils";
import { LoginForm } from "@/models";

const updateUsernameOnForm = (
    { lastName, firstName }: UserFormValues,
    setValue: UseFormSetValue<FieldValues>
) => {
    if (lastName && firstName) {
        setValue("username", generateUsername(firstName, lastName));
    }
};

export const userFormProvider: FormProvider<User> = {
    schema: z
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
        }),
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
            showOnEdit: false,
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
            showOnEdit: false,
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

export const changePasswordFormProvider: FormProvider<User> = {
    schema:
        z.object({
            password: z.string(),
            confirmation: z.string(),
        })
            .refine((data) => data.password === data.confirmation, {
                message: "Las contraseñas no coinciden",
                path: ["confirmation"],
            }),
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

export type UserFormValues = z.infer<typeof userFormProvider.schema>;
export type ChangeUserPasswordValues = z.infer<
    typeof changePasswordFormProvider.schema
>;

export const NO_PERMISSION = "";
