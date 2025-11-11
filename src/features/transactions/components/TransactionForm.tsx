import { TransactionFormValues } from "../lib/form";
import { Transaction } from "../models/transaction";
import TransactionFormDetails from "./TransactionFormDetails";
import useTransactionForm from "../hooks/useTransactionForm";
import { EntityFormProps } from "../../../components/EntityForm/models/entityFormProps";
import { useEntityForm } from "@/components/EntityForm";
import FormLayout from "@/components/EntityForm/layouts/FormLayout";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";
import FormSubscriptionWrapper from "@/components/EntityForm/components/FormSubscriptionWrapper";

type TransactionFormProps = EntityFormProps<TransactionFormValues, Transaction>;

const TransactionForm = ({ onDirtyChange, ...props }: TransactionFormProps) => {
  const config = useTransactionForm();
  const { form, ref, ...methods } = useEntityForm<TransactionFormValues>();

  return (
    <FormLayout {...methods}>
      {JSON.stringify(config.defaultValues)}
      <div className="flex">
        <div className="w-7/12">
          <FormBuilder<Transaction, TransactionFormValues>
            ref={ref}
            layout={[
              ["value", "date"],
              ["loanId", "payerId"],
              ["type", "penaltyRate"],
              ["description"],
            ]}
            onDirtyChange={onDirtyChange}
            {...config}
            {...props}
          />
        </div>
        <div className="w-5/12 px-3">
          <FormSubscriptionWrapper<TransactionFormValues>
            form={form}
            subscribedNames={["loanId", "value", "penaltyRate"]}
            render={(values) => (
              <TransactionFormDetails
                loanId={values.loanId}
                amount={values.value}
                penaltyRate={values.penaltyRate}
              />
            )}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default TransactionForm;
