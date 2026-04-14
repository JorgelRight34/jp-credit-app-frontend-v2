import z from "zod";

export const backgroundServiceConfigurationSchema = z.object({
    dayDifference: z.union([z.string(), z.number()]).transform(Number),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, "Invalid time format"),
    startDate: z.string().default(new Date().toISOString()),
})

export const backgroundServiceConfigurationsSchema = z.object({
    configurations: backgroundServiceConfigurationSchema.array()
})

export type BackgroundServiceConfigurationFormValues = z.infer<typeof backgroundServiceConfigurationsSchema>;
export type ConfigurationFormValues = z.infer<typeof backgroundServiceConfigurationSchema>;