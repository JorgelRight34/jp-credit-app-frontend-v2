import z from "zod";

export const profileFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().optional(),
    gender: z.string(),
    dateOfBirth: z.union([z.string(), z.date(), z.null()]),
    maritalStatus: z.string().optional(),
    dni: z.string().min(11).max(11),
    address: z.string().optional(),
    landline: z.string().optional(),
    officePhone: z.string().optional(),
    phoneNumber: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;