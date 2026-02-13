import { parse, serialize } from 'cookie'

export class CookieClientService {
    static get(key: string) {
        const cookies = parse(document.cookie ?? '');
        return cookies[key]
    }

    static set(key: string,
        value: string,
        options?: {
            days?: number
            path?: string
            secure?: boolean
            sameSite?: 'lax' | 'strict' | 'none'
        }) {
        const { days = 7, path = '/', secure = true, sameSite = 'lax' } = options ?? {};

        const expires = new Date()
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

        document.cookie = serialize(key, value, {
            expires,
            path,
            secure,
            sameSite,
        })
    }
}