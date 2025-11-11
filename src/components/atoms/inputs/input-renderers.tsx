import { ControllerRenderProps, FieldValues } from "react-hook-form";
import CurrencyInput from "./CurrencyInput";
import PercentageInput from "./PercentageInput";
import PasswordInput from "./PasswordInput";
import CitizenIdInput from "./CitizenIdInput";
import PhoneInput from "./PhoneInput";
import SelectInput from "./SelectInput";
import Input, { InputProps } from "./Input";
import ProfileSearchInput from "@/features/Profiles/components/ProfileSearchInput";
import ProjectSearchInput from "@/features/Projects/components/ProjectSearchInput";
import LoanSearchInput from "@/features/Loans/components/LoanSearchInput";
import { FormField } from "../models/formField";
import { ElementType } from "react";
import { DateRangeInput } from "@/components/EntityQuerySearch";
import LazySelectInput from "./LazySelectInput";
import DateInput from "./DateInput";
import TransactionSearchInput from "@/features/Transactions/components/TransactionSearchInput";
import CollateralSearchInput from "@/features/Collaterals/components/CollateralSearchInput";

type Field = ControllerRenderProps<FieldValues, string> &
  FormField<FieldValues> &
  InputProps & {
    error?: boolean;
    disabled?: boolean;
    className?: string;
  };

export const inputRenderers: Record<
  NonNullable<FormField<object>["type"]>,
  ElementType
> = {
  currency: CurrencyInput,

  percentage: PercentageInput,

  profile: ({ ...field }: Field) => (
    <ProfileSearchInput {...field} onChange={(p) => field.onChange(p.id)} />
  ),

  client: ({ ...field }: Field) => (
    <ProfileSearchInput
      role="client"
      {...field}
      onChange={(p) => field.onChange(p.id)}
    />
  ),

  guarantor: ({ ...field }: Field) => (
    <ProfileSearchInput
      role="guarantor"
      {...field}
      onChange={(p) => field.onChange(p.id)}
    />
  ),

  loanOfficer: ({ ...field }: Field) => (
    <ProfileSearchInput
      role="guarantor"
      {...field}
      onChange={(p) => field.onChange(p.id)}
    />
  ),

  project: ({ ...field }: Field) => (
    <ProjectSearchInput {...field} onChange={(p) => field.onChange(p.id)} />
  ),

  loan: ({ ...field }: Field) => (
    <LoanSearchInput {...field} onChange={(l) => field.onChange(l.id)} />
  ),

  transaction: ({ ...field }: Field) => (
    <TransactionSearchInput {...field} onChange={(t) => field.onChange(t.id)} />
  ),

  collateral: ({ ...field }: Field) => (
    <CollateralSearchInput {...field} onChange={(c) => field.onChange(c.id)} />
  ),

  password: ({ ...field }: Field) => <PasswordInput {...field} />,

  dni: ({ ...field }: Field) => <CitizenIdInput {...field} />,

  phone: ({ ...field }: Field) => <PhoneInput {...field} />,

  select: ({ ...field }: Field) => <SelectInput {...field} />,

  "lazy-select": ({ ...field }: Field) => <LazySelectInput {...field} />,

  "date-range": ({ ...field }: Field) => <DateRangeInput {...field} />,

  textarea: ({ ...field }: Field) => <Input type="text" {...field} multiline />,

  switch: () => <></>,

  text: ({ ...field }: Field) => <Input type="text" {...field} />,

  number: ({ ...field }: Field) => <Input type="number" {...field} />,

  date: ({ ...field }: Field) => <DateInput {...field} />,

  email: ({ ...field }: Field) => <Input type="email" {...field} />,

  default: ({ ...field }: Field) => <Input {...field} />,
};
