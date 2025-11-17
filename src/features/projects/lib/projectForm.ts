import { z } from "zod";
import { FormProvider } from "@/components";

export const schema = z.object({
  name: z.string(),
});

export type ProjectFormValues = z.infer<typeof schema>;

export const projectFormProvider: FormProvider<ProjectFormValues> = {
  schema: schema,
  fields: [
    {
      name: "name",
      id: "name",
      label: "Nombre",
    },
  ]
}
