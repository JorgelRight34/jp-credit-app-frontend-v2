import { parse, serialize } from 'cookie'

export class CookieClientService {
    static get(key: string) {
        const cookies = parse(document.cookie ?? '');
        return cookies[key] ?? null
    }

    static set(key: string,
        value: string,
        options?: {
            days?: number
            path?: string
            secure?: boolean
            sameSite?: 'lax' | 'strict' | 'none'
        }) {
        const { days = 7, path = '/', secure = false, sameSite = 'lax' } = options ?? {};

        const expires = new Date()
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

        document.cookie = serialize(key, value, {
            expires,
            path,
            secure,
            sameSite,
        })
    }

    static delete(key: string, path = '/') {
        document.cookie = serialize(key, '', {
            expires: new Date(0),
            path,
        })
    }
}