import {
    TEST,
    imageExtensions,
} from "../constants/constants";

export const getRandomName = () => {
    const firstNames = ["Max", "Leo", "Eli", "Sam", "Zoe", "Ava"];
    const lastNames = ["Doe", "Lee", "Kay", "Ray", "Fox", "Kim"];
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
};

export const getFullName = (user?: { firstName: string; lastName: string; }): string => {
    if (TEST) return getRandomName();
    if (!user) return "";

    return `${user?.firstName} ${user?.lastName}`;
};

export const getFirstAndLastName = (user?: { firstName: string; lastName: string; }): string => {
    if (TEST) return getRandomName();
    if (!user) return "";
    const firstName = user.firstName.split(" ")[0];
    const lastName = user.lastName.split(" ")[0];

    return `${firstName} ${lastName}`;
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

export const getPicWithInitials = (name: string, background = "random", color: string = "") => {
    return `https://ui-avatars.com/api/?name=${name}background=${background}&color=${color.replace("#", "",)}`;
};

export const range = (length: number): Array<number> => {
    return Array.from({ length }, (_, index) => index);
};

export type NumericKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T];

export type WithRequired<T, TKey extends keyof T> = Omit<T, TKey> & Required<Pick<T, TKey>>;

export const isImage = (ft?: string) =>
    imageExtensions.includes(ft ?? "");
