import FinanceQuerySearch from "../FinanceQuerySearch";
import FinanceStatCard from "../FinanceStatCard";
import { useProjectedIncomes } from "../../hooks/useProjectedIncomes";
import { FinanceReport } from "../../models/financeReport";
import ProjectionsGroupedDataTable from "./ProjectionsGroupedDataTable";
import { TimeUnit } from "@/models";
import FinanceSectionLayout from "../../layouts/FinanceSectionLayout/FinanceSectionLayout";
import { financialComponentTypesConfig } from "../../lib/constants";
import { useProjectedIncomesByPeriod } from "../../hooks/useProjectedIncomesByPeriod";
import { useEntitySection } from "@/components/organisms/entity-section";
import { FinanceQuery } from "../../models/financeQuery";
import { getTodayWithDaysFromNow } from "@/utils/utils";
import { EntityDataTableLayout } from "@/components";

const today = new Date();

const ProjectionSection = () => {
  const [query, setQuery, defaultValues] = useEntitySection<
    FinanceReport,
    FinanceQuery
  >({
    start: today,
    end: getTodayWithDaysFromNow(120),
    timeUnit: TimeUnit.month,
    limit: undefined,
  });

  const { summary } = useProjectedIncomes({ query });
  const { incomesByPeriod } = useProjectedIncomesByPeriod({ query });

  return (
    <EntityDataTableLayout>
      <EntityDataTableLayout.QuerySearch>
        <FinanceQuerySearch
          defaultValues={defaultValues}
          onSubmit={setQuery}
          attributes={{
            start: { min: today },
            end: { min: today },
          }}
        />
      </EntityDataTableLayout.QuerySearch>
      <EntityDataTableLayout.DataTable>
        <FinanceSectionLayout>
          <FinanceSectionLayout.Principal
            report={incomesByPeriod}
            query={query}
            table={
              <ProjectionsGroupedDataTable defaultQuery={query} query={query} />
            }
            chart={(report) => (
              <FinanceSectionLayout.Chart
                timeUnit={query.timeUnit}
                types={["capital", "interest", "total"]}
                report={{ start: query.start, end: query.end, items: report }}
              />
            )}
          />
          <FinanceSectionLayout.Secondary
            report={summary}
            render={(report) => (
              <>
                <FinanceStatCard
                  title="Capital"
                  color={financialComponentTypesConfig["capital"].color}
                  className="mb-3"
                  value={report.capital}
                />
                <FinanceStatCard
                  title="Intereses"
                  className="mb-3"
                  color={financialComponentTypesConfig["interest"].color}
                  value={report.interest}
                />
                <FinanceStatCard
                  title="Total"
                  className="mb-3"
                  color={financialComponentTypesConfig["total"].color}
                  value={report.total}
                />
              </>
            )}
          ></FinanceSectionLayout.Secondary>
        </FinanceSectionLayout>
      </EntityDataTableLayout.DataTable>
    </EntityDataTableLayout>
  );
};

export default ProjectionSection;
