import {
    imageExtensions,
    TEST,
} from "./constants";
import { Column } from "@/components";
import { Profile } from "@/features/profiles";
import { User } from "@/features/auth";


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

export const getRandomName = () => {
    const firstNames = ["Max", "Leo", "Eli", "Sam", "Zoe", "Ava"];
    const lastNames = ["Doe", "Lee", "Kay", "Ray", "Fox", "Kim"];
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
};

export const getFullName = (user?: Profile | User | null): string => {
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


export const showColumnsIfAssertion = <T,>(
    value: boolean,
    columns: Column<T>[],
    defaultColumns: Column<T>[] = []
): Column<T>[] => {
    return value ? columns : defaultColumns;
};

export const getUrlParams = (params: Record<string, unknown>) =>
    new URLSearchParams(
        Object.entries(params)
            .filter(([, value]) => value != null && value !== "")
            .map(([key, value]) => [key, String(value)])
    ).toString();


export const getSpanishYesOrNo = (value: boolean) => {
    return value ? "Sí" : "No";
};

export const getDNIFromString = (str: string) => {
    // Format the string as 'xxx-xxxxxxx-x'
    if (TEST) return "XXX-XXXXXXX-X";
    return `${str.slice(0, 3)}-${str.slice(3, 10)}-${str.slice(10, 11)}`;
};

export const getPicWithInitials = (name: string, background = "random", color: string = "") => {
    return `https://ui-avatars.com/api/?name=${name}background=${background}&color=${color.replace("#", "",)}`;
};

export const range = (length: number): number[] => {
    return Array.from({ length }, (_, index) => index);
};

export type NumericKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T];

export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;


export const isImage = (ft?: string) =>
    imageExtensions.includes(ft ?? "");
