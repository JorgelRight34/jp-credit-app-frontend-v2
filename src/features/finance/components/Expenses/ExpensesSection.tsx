import { TransactionType } from "@/features/transactions";
import ExpensesDataTable from "./ExpensesDataTable";
import { useFinancesSection } from "../../hooks/useFinancesSection";
import { EntityDataTableLayout } from "@/components";
import FinanceQuerySearch from "../FinanceQuerySearch";
import FinanceSectionLayout from "../../layouts/FinanceSectionLayout/FinanceSectionLayout";
import { FinanceStatCard, financialComponentTypesConfig } from "../..";

const ExpensesSection = () => {
  const [report, lastReport, config] = useFinancesSection({
    type: TransactionType.DS,
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
            to="/transactions/expenses"
            chart={(report) => (
              <FinanceSectionLayout.Chart
                timeUnit={config.query.timeUnit}
                types={["capital", "total"]}
                report={report}
              />
            )}
            table={
              <ExpensesDataTable data={report?.items} query={config.query} />
            }
          />
          <FinanceSectionLayout.Secondary
            report={report}
            lastReport={lastReport}
            render={(report, lastReport) => (
              <>
                <FinanceStatCard
                  title="Capital"
                  value={report.summary.capital}
                  color={financialComponentTypesConfig["capital"].color}
                  comparedValue={lastReport?.summary.capital}
                />
                <FinanceStatCard
                  title="Total"
                  value={report.summary.total}
                  color={financialComponentTypesConfig["total"].color}
                  comparedValue={lastReport?.summary.total}
                />
                <FinanceStatCard
                  title="Desembolsos"
                  value={report.totalItems}
                  color={financialComponentTypesConfig["totalItems"].color}
                  isCurrency={false}
                  comparedValue={lastReport?.totalItems}
                />
              </>
            )}
          ></FinanceSectionLayout.Secondary>
        </FinanceSectionLayout>
      </EntityDataTableLayout.DataTable>
    </EntityDataTableLayout>
  );
};

export default ExpensesSection;
