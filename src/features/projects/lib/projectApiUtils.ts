import { Query } from "@/components";
import { PROJECT_ID_KEY } from "@/lib/constants";

let cachedProjectId: number | null | undefined = undefined;

const readFromServerCookie = (): string | null => {
    const { getCookies } = require('@tanstack/react-start/server');
    const cookies = getCookies();
    return cookies[PROJECT_ID_KEY] ?? null;
};


const readProjectId = (): number | null => {
    const raw = typeof localStorage === "undefined"
        ? readFromServerCookie()
        : localStorage.getItem(PROJECT_ID_KEY);

    const parsed = Number(raw);
    return isNaN(parsed) ? null : parsed;
};

const getProjectId = (): number | null => {
    if (cachedProjectId === undefined) {
        cachedProjectId = readProjectId();
    }
    return cachedProjectId;
};

export const withProjectIdParams = (params: Query): Query => {
    const projectId = getProjectId();
    if (projectId !== null) {
        params.projectId = projectId;
    }
    return params;
};

export const invalidateProjectIdCache = () => {
    cachedProjectId = undefined;
};