export type EntityParams<T = unknown> = Partial<Record<keyof T, unknown>> & { include: Partial<(keyof T)[]> };
export type Params = Record<string, unknown>;