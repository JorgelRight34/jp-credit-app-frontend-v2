import { LoginFormValues } from "@/features/Auth/lib/form";
import { User } from "../features/Auth/models/user";
import api, { baseURL } from "./api";

export const getMe = async (): Promise<User> => {
    const response = await api.get(`users/me`);
    return response.data;
};

export const login = async (data: LoginFormValues) => {
    const response = await api.post<{ user: User; token: string }>(
        `${baseURL}/users/login`,
        data,
        {
            headers: {
                Authorization: ""
            }
        }
    );
    return response.data;
};