import { QuerySearchInput } from "./querySearchInput";
import { Query } from "../../../models/query";
import { UseEntityQuerySearchProps } from "@/components/EntityQuerySearch/hooks/useEntityQuerySearch";
import { WithRequired } from "@/utils/utils";

/**
 * Props for a query search component that submits queries and optionally supports reports and downloads.
 *
 * @template T - Type of the query object
 */
export interface QuerySearchProps<T extends Query, TReturn = T> extends WithRequired<Partial<UseEntityQuerySearchProps<T, TReturn>>, "onSubmit"> {
  /** Optional default query values to initialize the form */
  defaultValues?: T;

  /** Optional title to display on generated reports */
  reportTitle?: string;

  /** Shows the component only if there's a selected project  */
  showIfSelectedProject?: boolean;

  extraOptions?: QuerySearchInput<T>[];
}
