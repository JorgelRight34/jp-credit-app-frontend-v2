import type { LoginResult } from "../lib/loginResult";
import type { LoginSchemaType } from "../lib/schemas/loginSchema";
import type { User } from "../models/user";
import { SERVER_URI } from "@/lib/constants/server";
import api from "@/lib/services/api";


export const getCurrentUser = async (): Promise<User> => {
    const { data } = await api.get(`users/me`);
    return data;
};

export const login = async (body: LoginSchemaType): Promise<LoginResult> => {
    const { data } = await api.post(`login`, body, { baseURL: SERVER_URI });
    return data;
};

export const logout = async () => {

}