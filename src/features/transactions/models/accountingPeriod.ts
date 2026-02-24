export interface AccountingPeriod {
    id: number;
    startDate: string;
}

export interface ClosedPeriod extends AccountingPeriod {
    endDate: string;
}
