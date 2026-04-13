export interface BackgroundService {
    id: number;
    name: string;
    configurations: Array<{
        id: number;
        serviceId: number;
        name: string;
        dayOfDifference: number;
        startTime: string;
        lastExecutionDate?: string;
        startDate: string;
        rangeFromTicks: number;
    }>
}
