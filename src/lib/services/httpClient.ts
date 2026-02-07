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
            console.log("HTTP Request:", { url, ...rest });
            res = await fetch(url, {
                ...rest,
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                    ...headers,
                },
            });
        } catch (err) {
            // network/runtime error (no HTTP status available)
            console.error("HTTP Request Failed:", err);
            throw new HttpClientError({
                status: 502,
                message: JSON.stringify({ status: 502, message: err instanceof Error ? `${err.message} (${JSON.stringify(err, null, 2)})` : "Upstream request failed" })
            })
        }

        const text = await res.text();
        const data = safeJsonParse(text);

        if (res.ok) {
            return (data as T) ?? (null as T);
        }

        // reflect upstream status & payload
        console.error("HTTP Request Error:", { status: res.status, text, data });
        throw new HttpClientError({
            status: res.status,
            message: JSON.stringify({
                status: res.status,
                message: (data && typeof data === "object" && "message" in data && typeof (data as any).message === "string")
                    ? (data as any).message
                    : text || res.statusText,
                text,
                data
            }),
            text,
            data,
        });
    }

    public get<T>(endpoint: string, config?: HttpClientConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: "GET" });
    }

    public post<T>(endpoint: string, body?: unknown, config?: HttpClientConfig): Promise<T> {
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
