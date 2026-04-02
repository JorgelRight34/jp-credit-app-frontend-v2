import { jwtDecode } from "jwt-decode";
import { getFirstAndLastName, getPicWithInitials } from "./utils";
import { defaultProfilePic } from ".";
import { ACCESS_TOKEN_KEY } from "../constants";

export function isJwtValid(token?: string) {
    if (!token) return false;

    try {
        const decoded = jwtDecode<{ exp?: number }>(token);
        const now = Date.now() / 1000;
        return !!decoded.exp && decoded.exp > now;
    } catch {
        return false;
    }
}

export const getProfilePicWithInitials = (
    profile?: { firstName: string; lastName: string; } | null,
    background = "random",
    color = ""
) => {
    return profile ? getPicWithInitials(getFirstAndLastName(profile), background, color) : defaultProfilePic;
};

export const getNameInitials = (names: { firstName: string; lastName: string }) => {
    const first = names.firstName?.trim()?.[0] ?? '';
    const last = names.lastName?.trim()?.[0] ?? '';

    return (first + last).toUpperCase();
};

export const getAuthorizationFromClient = () => localStorage.getItem(ACCESS_TOKEN_KEY)