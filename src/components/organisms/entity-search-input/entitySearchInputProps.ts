/**
 * Props for a generic entity search input component.
 *
 * @template T - The type of the entity being searched and selected.
 */

import { Query } from "@/models/query";
import { EntitySectionProps } from "../entity-section";

/**
 * Props for a generic entity search input component.
 *
 * @template T - The type of the entity being searched and selected.
 */
export type EntitySearchInputProps<T, TQuery extends Query> =
  Omit<EntitySectionProps<T, TQuery>, "id" | "type"> & {
    floatingLabel?: boolean;
    placeholder?: string;
    label?: string;
    className?: string;
    isDisabled?: boolean | null;
    id?: string;
    defaultValue?: string | number | null | unknown;
    onChange?: (entity: T) => void;
    value?: string | number;
    error?: boolean;
  };
