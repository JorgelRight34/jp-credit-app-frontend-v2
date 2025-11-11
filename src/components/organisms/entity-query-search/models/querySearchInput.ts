import { Query } from "../../../models/query";
import { FormField } from "@/components/EntityForm";

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

/* & {

  /
 


  
  disabled?: boolean;

  metadata?: Record<string | number | symbol, unknown>;
  minValue?: number;

  onChange?: ((value: unknown, q: Dispatch<SetStateAction<T>>) => void);
  hideWhenDefault?: boolean;
} */