import {
    imageExtensions,
    PROJECT_URL_PARAM,
    TEST,
} from "./constants";
import { AxiosRequestConfig } from "axios";
import { Query } from "@/models/query";
import dayjs from "dayjs";
import { Column, FormInterceptor, Row } from "@/components";
import api from "@/services/api";
import { Profile } from "@/features/profiles";
import { User } from "@/features/auth";


export const toCurrency = (money: number | undefined): string | number => {
    if (money === undefined) return NaN;
    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(money);

    return formattedAmount;
};

export const normalizeDate = (d: Date) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date;
};

export const getTimeUnitFromTimesInAYear = (unit: number): string => {
    switch (unit) {
        case 12:
            return "Mensual";
        case 4:
            return "Trimestral";
        case 3:
            return "Cuatrimestral";
        default:
            return "Anual";
    }
};

export const groupBy = <T, K extends string | number | symbol>(
    array: T[],
    predicate: (item: T) => K
): Record<K, T[]> => {
    return array.reduce((acc, item) => {
        const key = predicate(item);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as Record<K, T[]>);
};

export const toFormattedDate = (date: string | Date): string => {
    if (!(date instanceof Date)) date = new Date(date);

    if (isNaN(date.getTime())) return "---";

    try {
        const formattedDate = new Intl.DateTimeFormat("fr-FR").format(date);
        return formattedDate;
    } catch {
        return date.toString();
    }
};

export const getFullDateString = (date?: string | Date): string => {
    if (!date) return "";
    let d: Date;

    if (typeof date === "string") {
        // Parse as local date to avoid timezone issues
        const [year, month, day] = date.split("T")[0].split("-").map(Number);
        d = new Date(year, month - 1, day); // month is 0-indexed
    } else {
        d = date;
    }

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const result = d.toLocaleDateString("es-ES", options);

    return result === "Invalid Date"
        ? "---"
        : result[0].toUpperCase() + result.slice(1);
};


export const getPartialDateString = (date: string | Date): string => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
};

export const getRandomName = () => {
    const firstNames = ["Max", "Leo", "Eli", "Sam", "Zoe", "Ava"];
    const lastNames = ["Doe", "Lee", "Kay", "Ray", "Fox", "Kim"];
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
};

export const getFullName = (user?: Profile | null): string => {
    if (TEST) return getRandomName();
    if (!user) return "";

    return `${user?.firstName} ${user?.lastName}`;
};

export const getFirstAndLastName = (user?: User | Profile): string => {
    if (TEST) return getRandomName();
    if (!user) return "";
    const firstName = user.firstName.split(" ")[0];
    const lastName = user.lastName.split(" ")[0];

    return `${firstName} ${lastName}`;
};

export const triggerDownload = (blob: Blob, filename = "filename") => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
}

export const handleTriggerBrowserDownload = (data: Blob) => {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 10000);
};

export const toTitleCase = (str?: string | number | null) => {
    if (!str || typeof (str) === "number") return str?.toString();
    return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const toAllTitleCase = (str: string) => {
    if (!str) return "";

    const name = str
        .split(" ")
        .map((part) => toTitleCase(part))
        .join(" ");
    return name;
};

export const getTodayFormattedDate = () => {
    const today = new Date();
    return dateToIsoString(today);
};

export const getFutureFormattedDateWithDaysFromNow = (days: number) => {
    const future = getTodayWithDaysFromNow(days);
    return dateToIsoString(future);
};

export const dateToStringFormat = (date?: Date | string, format: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'locale' = "YYYY-MM-DD") => {
    if (!date) return "";

    const dateObj = typeof date === "string" ? new Date(date) : date;

    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");

    switch (format) {
        case 'DD/MM/YYYY':
            return `${dd}/${mm}/${yyyy}`;
        case 'MM/DD/YYYY':
            return `${mm}/${dd}/${yyyy}`;
        case 'YYYY-MM-DD':
            return `${yyyy}-${mm}-${dd}`;
        default:
            return dateObj.toLocaleDateString(navigator.language, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
    }
};

export const dateToIsoString = (date?: Date | string) => {
    return dayjs(date).toISOString().split("T")[0]
};


export const formatLargeNumber = (value: number, toFixed: boolean): string => {
    const absoluteValue = Math.abs(value);
    let suffix = ""

    if (absoluteValue >= 1_000_000_000) {
        value /= 1_000_000_000
        suffix = "B"
    }

    else if (absoluteValue >= 1_000_000) {
        value /= 1_000_000
        suffix = "M"
    }

    else if (absoluteValue >= 1000) {
        value /= 1000
        suffix = "K"
    }

    return (toFixed ? value.toFixed(2) : value) + suffix;
}

export const getTodayWithDaysFromNow = (days = 30) => {
    const today = new Date();
    today.setDate(today.getDate() + days);

    return today;
};

export const sortDateRows = <TData,>(
    rowA: Row<TData>,
    rowB: Row<TData>,
    columnId: string
) => {
    const dateA = new Date(rowA.getValue(columnId));
    const dateB = new Date(rowB.getValue(columnId));
    return dateA.getTime() - dateB.getTime();
};

export const getAge = (dateOfBirth: Date | string) => {
    const today = new Date();
    if (typeof dateOfBirth === "string") dateOfBirth = new Date(dateOfBirth);

    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const month = today.getMonth() - dateOfBirth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate()))
        age--;

    return age;
};

export const getPmt = (
    annualInterestRate: number,
    paymentFrequency: number,
    nPer: number,
    amount: number
) => {
    const r = annualInterestRate / paymentFrequency; // Interest rate per period
    const n = nPer; // Total number of payments

    if (r === 0) return amount / n; // No interest

    // PMT formula
    const pmt = (r * amount) / (1 - Math.pow(1 + r, -n));
    return Number(pmt.toFixed(2));
};

export const getTotalInterest = (pmt: number, nPer: number, amount: number) => {
    const total = pmt * nPer - amount;
    return total;
};

export const showColumnsIfAssertion = <T,>(
    value: boolean,
    columns: Column<T>[],
    defaultColumns: Column<T>[] = []
): Column<T>[] => {
    return value ? columns : defaultColumns;
};

export const getUrlParams = (obj: object) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(obj)) {
        if (value != null && value !== "") params.append(key, String(value));
    }

    return params.toString();
};

export const getCurrentYear = () => new Date().getFullYear();

export const getProjectUrlParam = (projectId: number) => {
    return `${PROJECT_URL_PARAM}=${projectId}`;
};

export const getSpanishYesOrNo = (value: boolean) => {
    return value ? "Sí" : "No";
};

export const getDNIFromString = (str: string) => {
    // Format the string as 'xxx-xxxxxxx-x'
    if (TEST) return "XXX-XXXXXXX-X";
    return `${str.slice(0, 3)}-${str.slice(3, 10)}-${str.slice(10, 11)}`;
};

export const getPicWithInitials = (name: string, background = "random") => {
    return `https://ui-avatars.com/api/?name=${name}background=${background}`;
};

export const range = (length: number): number[] => {
    return Array.from({ length }, (_, index) => index);
};

export type NumericKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T];

export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;


export const fetchWithQueryParams = async <T>(
    endpoint: string, query?: T, interceptors: FormInterceptor<T>[] = [], config?: AxiosRequestConfig
) => {
    if (query) {
        for (const interceptor of interceptors) {
            query = interceptor(query);
        }
    }
    const response = await api.get(`${endpoint}`, { ...config, params: query });
    return response.data;
}

export const fetchBlobWithQueryParams = async <T extends Query>(endpoint: string, query?: T, interceptors: FormInterceptor<T>[] = []): Promise<Blob> => {
    return await fetchWithQueryParams(endpoint, query, interceptors, { responseType: "blob" });
}

export const getDayTimeDifference = (startDate?: Date, endDate?: Date) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffMs = end.getTime() - start.getTime();

    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    return diffDays;
}

export const getLocaleMonth = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    return date.toLocaleString(undefined, { month: "long" })
}

export const isImage = (ft?: string) =>
    imageExtensions.includes(ft ?? "");