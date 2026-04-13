import { Query } from "@/components";

export interface BackgroundServiceFilter extends Query {
    name?: string;
    serviceId?: number;
}