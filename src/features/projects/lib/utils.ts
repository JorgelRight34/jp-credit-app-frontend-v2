import { AxiosRequestConfig } from 'axios'
import { PROJECT_ID_STORAGE_KEY } from './constants'
import { CookieClientService } from '@/lib/services/cookieClientService'
import { COOKIES } from '@/lib/constants/cookies'

export const extendParamsWithProjectId = (
  params: AxiosRequestConfig['params'],
) => {
  params[PROJECT_ID_STORAGE_KEY] = localStorage.get(PROJECT_ID_STORAGE_KEY)
  return params
}

export const setProjectId = (value: number | string | null) => {
  if (value) {
    localStorage.setItem(PROJECT_ID_STORAGE_KEY, value.toString())
    CookieClientService.set(COOKIES.PROJECT_ID, value.toString())
  } else {
    localStorage.removeItem(PROJECT_ID_STORAGE_KEY);
    CookieClientService.delete(COOKIES.PROJECT_ID)
  }
}
