import { jwtDecode } from "jwt-decode";
import { getFirstAndLastName, getPicWithInitials } from "./utils";
import { ACCESS_TOKEN, defaultProfilePic } from ".";

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

export const getAuthorizationFromClient = () => localStorage.getItem(ACCESS_TOKEN)