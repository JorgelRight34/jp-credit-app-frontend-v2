import countries from "i18n-iso-countries";
import "i18n-iso-countries/langs/es.json";
import esLocale from "i18n-iso-countries/langs/es.json";
import { PagedResponse } from "../models/pagedResponse";
import { IconName } from "@/models";
import { Compound } from "@/features/Armotizations/models/compound";

countries.registerLocale(esLocale);

export const LOGOS = {
  horizontal: "/horizontal-logo.png",
  vertical: "/header.jpg",
};

export const IS_DEV_MODE = !(import.meta.env.VITE_MODE === "PROD")

export const ND = "N/D"

export const SMALL_SCREEN_BREAKPOINT = 500;

export const breadcrumbIcons: Record<string, IconName> = {
  create: "add",
  edit: "edit"
}

export const PERMISSIONS_ENDPOINT_SUFFIX = "permissions"

export const TEST = false;

export const CREATE_URL_SUFFIX = "create";

export const EDIT_URL_SUFFIX = "edit";

export const nullFieldLabel = "---";

export const createDefaultPagedResponse = <T>(): PagedResponse<T> => ({
  totalItems: 0,
  totalPages: 0,
  page: 1,
  pageSize: 0,
  items: [],
});

export const primaryColor = "#d09d0c";

export const secondaryColor = "#9c6334";

export const PROJECT_KEY = "project";
export const ACCESS_TOKEN = "accessToken";

export const countryTraductions = countries;

export const PROJECT_URL_PARAM = "projectId";

export const defaultPageSize = 20;

export const getMonthYearAfterAddingDays = (
  startDate: Date,
  daysToAdd: number
) => {
  const dateCopy = new Date(startDate); // Create a copy to avoid mutating the original
  dateCopy.setDate(dateCopy.getDate() + daysToAdd); // Add days (modifies dateCopy)

  const options: Intl.DateTimeFormatOptions = {
    month: "long", // "enero", "febrero", etc.
    year: "numeric", // 2024, 2025, etc.
  };

  return dateCopy.toLocaleDateString(undefined, options); // Format in Spanish
};

export const COMPOUND_VALUES: Record<Compound, number> = {
  [Compound.Annually]: 1,
  [Compound.SemiAnnually]: 2,
  [Compound.Quarterly]: 4,
  [Compound.Monthly]: 12,
  [Compound.SemiMonthly]: 24,
  [Compound.Biweekly]: 26,
  [Compound.Weekly]: 52,
  [Compound.Daily]: 365,
};

export const COMPOUND_OPTIONS = [
  [1, "Anual"], // 1 -> Compound.Annually
  [2, "Semestral"], // 2 -> Compound.SemiAnnually
  [4, "Trimestral"], // 4 -> Compound.Quarterly
  [12, "Mensual"], // 12 -> Compound.Monthly
  [24, "Quincenal"], // 24 -> Compound.SemiMonthly
  [26, "Bisemanal"], // 26 -> Compound.Biweekly
  [52, "Semanal"], // 52 -> Compound.Weekly
  [365, "Diario"], // 365 -> Compound.Daily
];

export const defaultProfilePic = "/default-profile-pic.webp";

export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
