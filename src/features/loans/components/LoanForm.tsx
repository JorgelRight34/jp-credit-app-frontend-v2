import { LoanFormValues } from "../lib/form";
import { Loan } from "../models/loan";
import useLoanForm from "../hooks/useLoanForm";
import { EntityFormProps } from "../../../components/EntityForm/models/entityFormProps";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";
import FormLayout from "@/components/EntityForm/layouts/FormLayout";
import { useEntityForm } from "@/components/EntityForm";
import FormSubscriptionWrapper from "@/components/EntityForm/components/FormSubscriptionWrapper";
import LoanFormDetails from "./LoanFormDetails";
import { Tab, Tabs } from "@/components/Tabs";
import LoanFormArmotization from "./LoanFormArmotization";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SMALL_SCREEN_BREAKPOINT } from "@/utils/constants";
import { Compound } from "@/features/Armotizations/models/compound";

interface LoanFormDefaultProps extends EntityFormProps<LoanFormValues> {
  edit?: Loan;
}

const LoanForm = ({ onDirtyChange, edit, ...props }: LoanFormDefaultProps) => {
  const config = useLoanForm({ edit });
  const { form, ref, ...methods } = useEntityForm<LoanFormValues>();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const isSmallScreen = useMediaQuery(SMALL_SCREEN_BREAKPOINT);

  return (
    <FormLayout {...methods}>
      <Tabs defaultActiveKey="form" navigate={false} onSelect={setActiveTab}>
        <Tab path="form" title="Formulario">
          <div className="flex">
            <div className="w-full md:w-7/12">
              <FormBuilder<Loan, LoanFormValues>
                ref={ref}
                layout={[
                  ["approvedAmount", "disbursedAmount", "interestRate"],
                  ["startDate", "paymentFrequency", "numberOfPayments"],
                  ["deliveryDate", "status", "projectId"],
                  ["clientId", "loanOfficerId", "guarantorId"],
                  ["description"],
                ]}
                onDirtyChange={onDirtyChange}
                edit={edit}
                {...config}
                {...props}
              />
            </div>
            <div className="hidden md:block md:w-5/12">
              <FormSubscriptionWrapper<LoanFormValues>
                form={form}
                subscribedNames={[
                  "disbursedAmount",
                  "numberOfPayments",
                  "annualInterestRate",
                  "paymentFrequency",
                ]}
                render={(values) => (
                  <LoanFormDetails
                    className="mx-auto mb-3 w-75 shadow-sm"
                    amount={values.disbursedAmount}
                    nPer={values.numberOfPayments}
                    annualInterestRate={values.annualInterestRate}
                    paymentFrequency={values.paymentFrequency}
                  />
                )}
              />
            </div>
          </div>
        </Tab>
        {isSmallScreen && (
          <Tab path="details" title="Resúmen">
            <FormSubscriptionWrapper<LoanFormValues>
              form={form}
              subscribedNames={[
                "disbursedAmount",
                "numberOfPayments",
                "annualInterestRate",
                "paymentFrequency",
              ]}
              render={(values) => (
                <LoanFormDetails
                  className="mx-auto mb-3 w-75 shadow-sm"
                  amount={values.disbursedAmount}
                  nPer={values.numberOfPayments}
                  annualInterestRate={values.annualInterestRate}
                  paymentFrequency={values.paymentFrequency}
                />
              )}
            />
          </Tab>
        )}

        <Tab path="armotization" title="Armotización">
          <FormSubscriptionWrapper
            form={form}
            subscribedNames={[
              "disbursedAmount",
              "annualInterestRate",
              "paymentFrequency",
              "numberOfPayments",
            ]}
            render={(values) => (
              <LoanFormArmotization
                enabled={activeTab === "armotization"}
                {...values}
                compound={Compound.Annually}
                principalBalance={values.disbursedAmount}
              />
            )}
          />
        </Tab>
      </Tabs>
    </FormLayout>
  );
};

export default LoanForm;
