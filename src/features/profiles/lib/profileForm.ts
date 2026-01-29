import { z } from "zod";
import { Country } from "country-state-city"
import { countryTraductions } from "../../../lib/utils/constants";
import { FormProvider } from "@/components";

export const baseUrl = "users";

const profileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
  gender: z.string(),
  dateOfBirth: z.union([z.string(), z.date()]),
  maritalStatus: z.string().optional(),
  dni: z.string().min(11).max(11),
  address: z.string().optional(),
  landline: z.string().optional(),
  officePhone: z.string().optional(),
  phoneNumber: z.string().optional(),
  profession: z.string().optional(),
  nationality: z.string().optional(),
  city: z.string(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const profileFormProvider: FormProvider<ProfileFormValues> = {
  schema: profileFormSchema,
  fields: [
    { name: "firstName", id: "firstName", label: "Nombres" },
    { name: "lastName", id: "lastName", label: "Apellidos" },
    { name: "email", id: "email", label: "Email", type: "email" },
    {
      name: "dateOfBirth",
      id: "dateOfBirth",
      label: "Nacimiento",
      type: "date",
    },
    { name: "dni", type: "dni", id: "dni", label: "Cédula" },
    { name: "address", id: "address", label: "Dirección" },
    { name: "profession", id: "profession", label: "Profesión" },
    { name: "landline", id: "landline", type: "phone", label: "Teléfono Fijo" },
    {
      name: "officePhone",
      id: "officePhone",
      type: "phone",
      label: "Teléfono Oficina",
    },
    {
      name: "phoneNumber",
      id: "phoneNumber",
      type: "phone",
      label: "Celular",
    },
    {
      name: "gender",
      id: "gender",
      label: "Género",
      type: "select",
      options: [
        ["M", "Masculino"],
        ["F", "Femenino"],
      ],
    },
    {
      name: "maritalStatus",
      label: "Estado Civil",
      id: "maritalStatus",
      type: "select",
      options: [
        ["single", "Soltero"],
        ["married", "Casado"],
        ["divorced", "Divorciado"],
        ["widow", "Viud@"],
      ],
    },
    {
      name: "nationality",
      id: "nationality",
      label: "Nacionalidad",
      type: "select",
      options: Country.getAllCountries().map((country) => [
        country.isoCode,
        countryTraductions.getName(country.isoCode, "es") || "",
      ]),
    },
    {
      name: "city",
      id: "city",
      label: "Ciudad",
      type: "select",
      options: [["Santo Domingo", "Santo Domingo"]]
    },
  ]
}

