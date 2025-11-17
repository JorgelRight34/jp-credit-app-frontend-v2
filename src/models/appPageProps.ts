import { ReactNode } from "react";

export type AppPageProps<T = { id: number }> = {
    params: T;
    children: Readonly<ReactNode>
}