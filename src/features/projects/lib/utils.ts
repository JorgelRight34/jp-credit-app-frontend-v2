import { AxiosRequestConfig } from 'axios'
import { PROJECT_ID_STORAGE_KEY } from './constants'
import { CookieClientService } from '@/lib/services/cookieClientService'

export const extendParamsWithProjectId = (
  params: AxiosRequestConfig['params'],
) => {
  params[PROJECT_ID_STORAGE_KEY] = localStorage.get(PROJECT_ID_STORAGE_KEY)
  return params
}

export const getProjectId = (): number => {
  return Number(localStorage.getItem(PROJECT_ID_STORAGE_KEY))
}

export const setProjectId = (value: number | string | null) => {
  if (value) {
    localStorage.setItem(PROJECT_ID_STORAGE_KEY, value.toString())
    CookieClientService.set(PROJECT_ID_STORAGE_KEY, value.toString())
  }
}