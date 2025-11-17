"use client";

import {
  EntityFormProps,
  FormBuilder,
  FormLayout,
  FormSubscriptionWrapper,
  Tab,
  Tabs,
  useEntityForm,
} from "@/components";
import {
  Loan,
  LoanFormArmotization,
  LoanFormDetails,
  LoanFormValues,
} from "..";
import useLoanForm from "../hooks/useLoanForm";
import { useState } from "react";
import { SMALL_SCREEN_BREAKPOINT } from "@/utils/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Compound } from "@/features/calculators";

type LoanFormDefaultProps = EntityFormProps<LoanFormValues, Loan>;

const LoanForm = ({ edit, ...props }: LoanFormDefaultProps) => {
  const config = useLoanForm({ edit });
  const { form, ref, onDirtyChange, ...methods } =
    useEntityForm<LoanFormValues>();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const isSmallScreen = useMediaQuery(SMALL_SCREEN_BREAKPOINT);

  return (
    <FormLayout {...methods}>
      <Tabs defaultActiveKey="form" navigate={false} onSelect={setActiveTab}>
        <Tab eventKey="form" title="Formulario">
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
          <Tab eventKey="details" title="Resúmen">
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
        <Tab eventKey="armotization" title="Armotización">
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
