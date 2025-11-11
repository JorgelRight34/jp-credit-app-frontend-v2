import { PageSize } from "@/components/DataTable/models/pageSize";

export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: PageSize;
  totalItems: number;
  totalPages: number;
}
