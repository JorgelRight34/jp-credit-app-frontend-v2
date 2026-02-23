import { createIsomorphicFn } from "@tanstack/react-start"
import { PROJECT_ID_STORAGE_KEY } from "../lib/constants"
import { CookieService } from "@/lib/services/cookieService"
import { COOKIES } from "@/lib/constants/cookies"

export const getProjectId = createIsomorphicFn()
    .server(() => Number(CookieService.get(COOKIES.PROJECT_ID)))
    .client(() => Number(localStorage.getItem(PROJECT_ID_STORAGE_KEY)))
