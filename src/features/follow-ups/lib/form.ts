import { FormProvider } from "@/components/EntityForm/models/formProvider";
import { z } from "zod";

const followUpFormSchema = z.object({
  title: z.string(),
  body: z.string(),
  loanId: z.number(),
})

export const followUpFormProvider: FormProvider<FollowUpFormValues> = {
  schema: followUpFormSchema,
  fields: [
    {
      name: "title",
      id: "title",
      label: "Título",
    },
    {
      name: "loanId",
      label: "Préstamo",
      id: "loanId",
      type: "loan",
      showOnEdit: false,
    },
    {
      name: "body",
      label: "Descripción",
      id: "body",
      type: "textarea",
      rows: 5,
    },
  ]
}

export type FollowUpFormValues = z.infer<typeof followUpFormSchema>;
