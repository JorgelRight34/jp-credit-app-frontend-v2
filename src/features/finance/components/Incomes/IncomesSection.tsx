"use client";

import { EntityDataTableLayout } from "@/components";
import { useFinancesSection } from "../../hooks/useFinancesSection";
import IncomesDataTable from "./IncomesDataTable";
import { TransactionType } from "@/features/transactions";
import FinanceQuerySearch from "../FinanceQuerySearch";
import FinanceSectionLayout from "../../layouts/FinanceSectionLayout/FinanceSectionLayout";
import { FinanceStatCard, financialComponentTypesConfig } from "../..";

const IncomesSection = () => {
  const [report, lastReport, config] = useFinancesSection({
    type: TransactionType.PC,
  });

  return (
    <EntityDataTableLayout>
      <EntityDataTableLayout.QuerySearch>
        <FinanceQuerySearch {...config} onSubmit={config.onSubmit} />
      </EntityDataTableLayout.QuerySearch>
      <EntityDataTableLayout.DataTable>
        <FinanceSectionLayout>
          <FinanceSectionLayout.Principal
            report={report}
            query={config.query}
            to="/transactions/incomes"
            chart={(report) => (
              <FinanceSectionLayout.Chart
                timeUnit={config.query.timeUnit}
                types={["capital", "interest", "fee", "total"]}
                report={report}
              />
            )}
            table={
              <IncomesDataTable
                data={report?.items}
                query={config.query}
                defaultQuery={config.defaultValues}
              />
            }
          />
          <FinanceSectionLayout.Secondary
            report={report}
            lastReport={lastReport}
            render={(report, lastReport) => (
              <>
                <FinanceStatCard
                  title="Capital"
                  className="mb-3"
                  color={financialComponentTypesConfig["capital"].color}
                  value={report.summary.capital}
                  comparedValue={lastReport?.summary.capital}
                />
                <FinanceStatCard
                  title="Intereses"
                  className="mb-3"
                  color={financialComponentTypesConfig["interest"].color}
                  value={report.summary.interest}
                  comparedValue={lastReport?.summary.interest}
                />
                <FinanceStatCard
                  title="Mora"
                  className="mb-3"
                  color={financialComponentTypesConfig["fee"].color}
                  value={report.summary.fee}
                  comparedValue={lastReport?.summary.fee}
                />
                <FinanceStatCard
                  title="Total"
                  value={report.summary.total}
                  color={financialComponentTypesConfig["total"].color}
                  comparedValue={lastReport?.summary.total}
                />
              </>
            )}
          ></FinanceSectionLayout.Secondary>
        </FinanceSectionLayout>
      </EntityDataTableLayout.DataTable>
    </EntityDataTableLayout>
  );
};

export default IncomesSection;
