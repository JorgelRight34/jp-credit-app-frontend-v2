import type { PageSize } from "@/components";

export interface PagedResponse<T> {
  items: Array<T>;
  page: number;
  pageSize: PageSize;
  totalItems: number;
  totalPages: number;
}
