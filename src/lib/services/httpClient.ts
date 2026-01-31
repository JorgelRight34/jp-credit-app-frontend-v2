import { CookieService } from "./cookieService";

type HttpClientConfig = RequestInit & {
    baseURL?: string;
};

export class HttpClientError extends Error {
    status: number;
    ok = false;
    text?: string;
    data?: unknown;

    constructor(args: { status: number; message: string; text?: string; data?: unknown }) {
        super(args.message);
        this.name = "HttpClientError";
        this.status = args.status;
        this.text = args.text;
        this.data = args.data;
    }
}

export class HttpClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(endpoint: string, config: HttpClientConfig = {}): Promise<T> {
        const { headers, baseURL, ...rest } = config;
        const url = (baseURL ?? this.baseURL) + endpoint;

        const token = CookieService.getAuthorization();

        let res: Response;
        try {
            res = await fetch(url, {
                ...rest,
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                    ...headers,
                },
            });
        } catch (err) {
            console.log("hubo un error...")
            // network/runtime error (no HTTP status available)
            throw new HttpClientError({
                status: 502,
                message: err instanceof Error ? err.message : "Upstream request failed",
            });
        }

        const text = await res.text();
        const data = safeJsonParse(text);

        if (res.ok) {
            console.log(JSON.stringify(data, null, 2))
            return (data as T) ?? (null as T);
        }

        // reflect upstream status & payload
        console.log("Returning http error")
        throw new HttpClientError({
            status: res.status,
            message: (data && typeof data === "object" && "message" in data && typeof (data as any).message === "string")
                ? (data as any).message
                : text || res.statusText,
            text,
            data,
        });
    }

    public get<T>(endpoint: string, config?: HttpClientConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: "GET" });
    }

    public post<T>(endpoint: string, body?: unknown, config?: HttpClientConfig): Promise<T> {
        console.log("this is my body", body)
        return this.request<T>(endpoint, {
            ...config,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        });
    }
}

function safeJsonParse(text: string): unknown {
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
}
