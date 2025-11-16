import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormField } from "../models/formField";
import { ElementType } from "react";
import {
  CitizenIdInput,
  DateInput,
  Input,
  InputProps,
  LazySelectInput,
  PasswordInput,
  PhoneInput,
  SelectInput,
  CurrencyInput,
  PercentageInput,
} from "@/components/atoms";
import { ProfilesSearchInput } from "@/features/profiles";
import { ProjectSearchInput } from "@/features/projects";
import { LoanSearchInput } from "@/features/loans";
import { TransactionSearchInput } from "@/features/transactions";
import { CollateralSearchInput } from "@/features/collaterals";

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
    <ProfilesSearchInput {...field} onChange={(p) => field.onChange(p.id)} />
  ),

  client: ({ ...field }: Field) => (
    <ProfilesSearchInput
      role="client"
      {...field}
      onChange={(p) => field.onChange(p.id)}
    />
  ),

  guarantor: ({ ...field }: Field) => (
    <ProfilesSearchInput
      role="guarantor"
      {...field}
      onChange={(p) => field.onChange(p.id)}
    />
  ),

  loanOfficer: ({ ...field }: Field) => (
    <ProfilesSearchInput
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

  password: PasswordInput,

  dni: CitizenIdInput,

  phone: PhoneInput,

  select: SelectInput,

  date: DateInput,

  "lazy-select": LazySelectInput,

  textarea: ({ ...field }: Field) => <Input type="text" {...field} multiline />,

  switch: () => <></>,

  text: ({ ...field }: Field) => <Input type="text" {...field} />,

  number: ({ ...field }: Field) => <Input type="number" {...field} />,

  email: ({ ...field }: Field) => <Input type="email" {...field} />,

  default: ({ ...field }: Field) => <Input {...field} />,
};
