import { z } from "zod";
import { FormProvider } from "../../../../../bk/form-builder";

const fileFormSchema = z.object({
    name: z.string(),
    url: z.string().url(),
    downloadUrl: z.string().url()
})

export const fileFormProvider: FormProvider<FileFormFieldValues> = {
    schema: fileFormSchema,
    fields: [
        {
            id: "name",
            name: "name",
            label: "Filename"
        },
        {
            id: "url",
            name: "url",
            label: "Enlace"
        },
        {
            id: "downloadUrl",
            name: "downloadUrl",
            type: "hidden",
            label: "",
            watchedValues: ["url"],
            changeWhen: ({ url }) => {
                console.log(url)
            }
        }
    ]
}


export type FileFormFieldValues = z.infer<typeof fileFormSchema>;