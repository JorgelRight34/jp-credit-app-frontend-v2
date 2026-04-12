// lib/router-utils.ts
const SITE = 'Sistema de crédito'

export function buildHead<T>(loaderData: T | undefined, buildTitle: (data: T) => string) {
    return { meta: [{ title: loaderData ? buildTitle(loaderData) : SITE }] }
}

export const buildPageTitle = (title?: string) => `${title} | ${SITE}`
export const buildCreatePageTitle = (title?: string) => `Crear ${title} | ${SITE}`
export const buildEditPageTitle = (title?: string) => `Editar ${title} | ${SITE}`
export const buildDeletePageTitle = (title?: string) => `Borrar ${title} | ${SITE}`
export const buildHistoryPageTitle = (title?: string) => `Historial ${title} | ${SITE}`
export const buildReportPageTitle = () => `Crear Plantilla Reporte | ${SITE}`
export const buildSettingsPageTitle = (title: string) => `${title} | Configuraciones | ${SITE}`

// head helpers
export const buildPageHead = <T>(data: T | undefined, fn: (d: T) => string) => buildHead(data, (d) => buildPageTitle(fn(d)))
export const buildCreateHead = <T>(data: T | undefined, fn: (d: T) => string) => buildHead(data, (d) => buildCreatePageTitle(fn(d)))
export const buildEditHead = <T>(data: T | undefined, fn: (d: T) => string, suffix?: string) => buildHead(data, (d) => buildEditPageTitle(fn(d)))
export const buildDeleteHead = <T>(data: T | undefined, fn: (d: T) => string, suffix?: string) => buildHead(data, (d) => buildDeletePageTitle(fn(d)))
export const buildHistoryHead = <T>(data: T | undefined, fn: (d: T) => string, suffix?: string) => buildHead(data, (d) => buildHistoryPageTitle(fn(d)))
export const buildSettingsHead = <T>(data: T | undefined, fn: (d: T) => string, suffix?: string) => buildHead(data, (d) => buildSettingsPageTitle(fn(d)))