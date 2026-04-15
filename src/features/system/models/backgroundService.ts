export interface BackgroundService {
    id: number;
    name: string;
    shortDescription?: string;
    configurations: Array<{
        id: number;
        serviceId: number;
        name: string;
        dayDifference: number;
        startTime: string;
        lastExecutionDate?: string;
        startDate: string;
        rangeFromTicks: number;
    }>
}

export type PropsWithBackgroundService<T = object> = { worker: BackgroundService } & T;