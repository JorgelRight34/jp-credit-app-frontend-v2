import { ZodType } from "zod";

export type SchemaType<T> = ZodType<T, Record<string, unknown>>;