import { FormField } from "./formField";
import { FieldValues } from "react-hook-form";
import { SchemaType } from "./schemaType";

export interface FormProvider<T extends FieldValues = FieldValues> {
    /**
    * Zod validation schema for the form.
    * Used to validate the entire form structure before submission.
    */
    schema: SchemaType<T>;

    /**
     * Array of form field definitions, these are all the inputs that make the form.
     */
    fields: FormField<T>[];
}