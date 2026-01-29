import { FieldValues } from "react-hook-form";
import {
  useFormSubscribe,
  UseFormSubscribeProps,
} from "../hooks/useFormSubscribe";
import { ReactNode } from "react";

type FormSubscriptionWrapperProps<T extends FieldValues> =
  UseFormSubscribeProps<T> & {
    render: (args: Partial<T>) => ReactNode;
  };

const FormSubscriptionWrapper = <T extends FieldValues>({
  form,
  ...props
}: Omit<FormSubscriptionWrapperProps<T>, "form"> & {
  form?: UseFormSubscribeProps<T>["form"];
}) => {
  if (form) {
    return <FormSubscription form={form} {...props} />;
  } else {
    return null;
  }
};

const FormSubscription = <T extends FieldValues>({
  form,
  subscribedNames,
  render,
}: FormSubscriptionWrapperProps<T>) => {
  const subscribedValues = useFormSubscribe<T>({ form, subscribedNames });

  return render(subscribedValues);
};

export default FormSubscriptionWrapper;
