

type HttpClientConfig = RequestInit & {
    baseURL?: string;
    request?: Request;
    ensureSuccessOverride?: boolean;
};

export type HttpClientResponse<T> = {
    data: T, status: number,
    ok: boolean;
    message?: string;
    text?: string;
}


export class HttpClient {
    private baseURL: string;
    private ensureSuccess: boolean;

    constructor(baseURL: string, ensureSuccess: boolean = false) {
        this.baseURL = baseURL;
        this.ensureSuccess = ensureSuccess;
    }

    private async request<T>(
        endpoint: string,
        config: HttpClientConfig = {}
    ): Promise<HttpClientResponse<T>> {
        const { headers, request, baseURL, ensureSuccessOverride, ...rest } = config;
        const url = (baseURL ?? this.baseURL) + endpoint;

        const authHeader = request?.headers.get("authorization");
        const res = await fetch(url, {
            ...rest,
            headers: {
                "Content-Type": "application/json",
                ...(authHeader && { Authorization: authHeader }),
                ...headers,
            },
        })

        const text = await res.text();
        if ((this.ensureSuccess || ensureSuccessOverride) && !res.ok) {
            throw new Error(`Error on ${url}, ${text}`)
        }

        return {
            data: text ? JSON.parse(text) : null,
            status: res.status,
            text,
            ok: res.ok
        };
    }

    public async get<T>(endpoint: string, config?: HttpClientConfig): Promise<HttpClientResponse<T>> {
        return this.request<T>(endpoint, {
            ...config,
            method: "GET",
        });
    }

    public async post<T>(endpoint: string, body?: unknown, config?: HttpClientConfig): Promise<HttpClientResponse<T>> {
        return this.request<T>(endpoint, {
            ...config,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,

        });
    }
}