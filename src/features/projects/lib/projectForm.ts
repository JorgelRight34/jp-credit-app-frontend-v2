import { z } from "zod";
import { FormField } from "../../../models/formField";
import { Project } from "../models/project";

export const schema = z.object({
  name: z.string(),
});

export type ProjectFormValues = z.infer<typeof schema>;

export const projectFormFields: FormField<Project>[] = [
  {
    name: "name",
    id: "name",
    label: "Nombre",
  },
];
