import type { User } from "../models/user";
import type { LoginResult } from "../models/loginResult";
import { baseURL } from "@/lib/services"
import { CookieService } from "@/lib/services/cookieService";

export const loginWithIdp = async (data: { username: string; password: string; }): Promise<LoginResult> => {
    const response = await fetch(`${baseURL}/users/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data)
    });
    return await response.json();
}

export const getCurrentUserFromServer = async (): Promise<User> => {
    const response = await fetch(baseURL + "users/me", {
        headers: {
            "Authorization": `Bearer ${CookieService.getAuthorization()}`
        }
    });
    return await response.json()
}