import type { z } from "zod";

export type SchemaType<T = unknown> = z.ZodType<T, any, any>;

export type InferSchema<TSchema extends SchemaType> = z.infer<TSchema>;