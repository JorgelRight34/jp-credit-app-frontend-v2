import { PageSize } from "@/components";

export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: PageSize;
  totalItems: number;
  totalPages: number;
}
