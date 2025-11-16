
import { SelectOptions } from "@/models";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { IconInputSlotProps } from "../../../atoms/inputs/input/react-utils";

/**
 * A generic form field definition that supports custom behaviors and validation.
 *
 * @template TData - The type of the data object this form is bound to.
 */
export interface BaseFormField<TData extends FieldValues> {
  // ─────────────────────────────────────────────
  // 🔹 Basic Field Info
  // ─────────────────────────────────────────────

  /** Input name attribute (used as key in form data). */
  name: (keyof TData) | string;

  /** HTML id attribute, often used for label association. */
  id?: keyof TData | string;
  icon?: IconInputSlotProps;

  /** Field label shown in the UI. */
  label: string;

  /** Field type, including custom types like  "dni", "loan", etc. */
  type?:
  | "dni"
  | "phone"
  | "loan"
  | "profile"
  | "project"
  | "collateral"
  | "transaction"
  | "note"
  | "date"
  | "currency"
  | "select"
  | "password"
  | "text"
  | "date-range"
  | "client"
  | "guarantor"
  | "loanOfficer"
  | "date-range"
  | "switch"
  | "email"
  | string
  ;

  /** Whether the field is required for form submission. */
  required?: boolean;

  /** Whether the field is read-only. */
  readOnly?: boolean;

  /** Whether the field is disabled. */
  disabled?: boolean;

  // ─────────────────────────────────────────────
  // 🔹 Default / Fixed Values & Display Behavior
  // ─────────────────────────────────────────────

  /** Whether the field should be shown during edit mode. */
  showOnEdit?: boolean;

  // ─────────────────────────────────────────────
  // 🔹 Conditional Logic Based on Watched Fields
  // ─────────────────────────────────────────────

  /** Names of multiple fields to watch for changes. */
  watchedValues?: (keyof TData)[];

  /**
   * Logic to run when a watched field changes. Typically used to update other fields.
   * @param watch - Function to retrieve any current value of the form.
   * @param setValue - Function to update a form field’s value.
   */
  changeWhen?: (
    form: TData,
    setValue: UseFormSetValue<TData>
  ) => void;

  /**
   * Logic to determine if the field should be disabled based on watched fields.
   * @param watch - Function to retrieve the current value of form field.
   */
  disabledWhen?: (form: TData) => boolean;

  // ─────────────────────────────────────────────
  // 🔹 Select / Autocomplete Data Relationships
  // ─────────────────────────────────────────────

  /**
   * Options for select-type fields, as an array of [value, label] pairs.
   */
  placeholder?: string;
  min?: unknown;
}

interface NumberFormField<TData extends FieldValues> extends BaseFormField<TData> {
  type: "number" | string;
  /** Minimum value or string length (depending on field type). */
  min?: number;

  /** Step value (for number fields). */
  step?: number;
}

interface SelectFormField<TData extends FieldValues> extends BaseFormField<TData> {
  type: "select" | string;
  options: SelectOptions;
}

export interface LazySelectFormField<TData extends FieldValues> extends SelectFormField<TData> {
  type: "lazy-select"
  loadOptions?: (form: TData) => Promise<SelectOptions>
  watchedValues?: (keyof TData)[];
}

interface RowFormField<TData extends FieldValues> extends BaseFormField<TData> {
  /** Number of rows (for textarea fields). */
  type: "textarea";
  rows?: number;
}

type PercentageFormField<TData extends FieldValues> = NumberFormField<TData> & {
  type: "percentage"
}

type DateFormField<TData extends FieldValues> = BaseFormField<TData> & {
  min?: Date;
}

type LoanFormFiled<TData extends FieldValues> = BaseFormField<TData> & {
  profileId?: number;
}

type ProfileFormField<TData extends FieldValues> = BaseFormField<TData> & {
  loanId?: number;
}

export type FormField<TData extends FieldValues> =
  BaseFormField<TData> |
  NumberFormField<TData> |
  RowFormField<TData> |
  LazySelectFormField<TData> |
  PercentageFormField<TData> |
  SelectFormField<TData> |
  DateFormField<TData> |
  LoanFormFiled<TData> |
  ProfileFormField<TData>
