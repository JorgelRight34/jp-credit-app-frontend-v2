import { FieldValues } from "react-hook-form";


/** 
 * Configuration for form layout and optional extra info rendering.
 */
type AllKeyUsed<T extends FieldValues, L extends (keyof T | null)[][]> = Exclude<keyof T, L[number][number]> extends never ? L : never;

export type FormLayout<T extends FieldValues> = AllKeyUsed<T, (keyof T | null)[][]>