import { HttpClientError } from "../services/httpClient";

export function toUpstreamResponse(err: HttpClientError) {
    const body =
        err.text ??
        (err.data ? JSON.stringify(err.data) : JSON.stringify({ message: err.message }));

    console.log(err.status)
    return new Response(body, {
        status: err.status,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const withErrorHandler = async (func: () => Promise<Response>) => {
    try {
        return await func()
    } catch (error) {
        if (error instanceof HttpClientError) {
            console.log("Erees instancia")
            return toUpstreamResponse(error)
        }
        throw error;
    }
}