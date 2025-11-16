import { Query } from "@/models/query";
import { FormField } from "../../form-builder/models/formField";

/**
 * Props for a query search input component with flexible input types and options.
 *
 * @template T - The type of the query object used, extending Query.
 */
export type QuerySearchInput<T extends Query> = FormField<T> & {
  col?: number;

  searchOnChange?: boolean;
  hideWhenDefault?: boolean;

  searchOnKeyUp?: boolean;
  showOnSmallScreen?: boolean;
}
