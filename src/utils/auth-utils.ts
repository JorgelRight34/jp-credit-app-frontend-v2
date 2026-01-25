import { jwtDecode } from "jwt-decode";

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
