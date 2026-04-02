import { CookieClientService } from '@/lib/services/cookieClientService'
import { COOKIES } from '@/lib/constants/cookies'
import { PROJECT_ID_KEY } from '@/lib/constants'


export const setProjectId = (value: number | string | null) => {
  if (value) {
    localStorage.setItem(PROJECT_ID_KEY, value.toString())
    CookieClientService.set(COOKIES.PROJECT_ID, value.toString())
  } else {
    localStorage.removeItem(PROJECT_ID_KEY);
    CookieClientService.delete(COOKIES.PROJECT_ID)
  }
}
