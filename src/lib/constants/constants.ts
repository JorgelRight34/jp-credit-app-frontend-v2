import type { PagedResponse } from "@/models";

export const FORM_PAGE_TITLES = {
  create: (title: string) => "Crear" + " " + title,
  edit: (title: string) => "Editar" + " " + title
}

export const LOGOS = {
  horizontal: "/horizontal-logo.png",
  vertical: "/header.jpg",
};

export const IS_DEV_MODE = !(process.env.VITE_MODE === "PROD")

export const ND = "N/D"

export const DASHES = "---"

export const SMALL_SCREEN_BREAKPOINT = 768;

export const TEST = false;

export const createDefaultPagedResponse = <T>(): PagedResponse<T> => ({
  totalItems: 0,
  totalPages: 0,
  page: 1,
  pageSize: 0,
  items: [],
});

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


export const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "bmp",
  "svg",
  "tiff",
  "image/png",
];