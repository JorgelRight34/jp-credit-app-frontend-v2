import z from "zod";

export const roleFormSchema = z.object({ name: z.string() });

export type RoleFormSchemaValues = z.infer<typeof roleFormSchema>;