import type { User } from "../models/user";
import type { LoginFormValues } from "../lib/form";
import api from "@/lib/services/api";


export const getMe = async (): Promise<User> => {
    const { data } = await api.get(`users/me`);
    return data;
};

export const login = async (body: LoginFormValues) => {
    const { data } = await api.post<{ user: User; token: string }>(`users/login`, body);
    return data;
};