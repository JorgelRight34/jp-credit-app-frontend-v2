import { deleteCookie, getCookies } from '@tanstack/react-start/server';
import { COOKIES } from '../constants/cookies';

export class CookieService {
    static get(name: string) {
        const cookies = getCookies()
        return cookies[name]
    }

    static delete(name: string) {
        deleteCookie(name);
    }

    static getAuthorization() {
        return this.get(COOKIES.ACCESS_TOKEN)
    }
}