import FinanceQuerySearch from "../FinanceQuerySearch";
import { useEntitySection } from "@/components/EntitySection/hooks/useEntitySection";
import { FinanceQuery } from "../../models/financeQuery";
import { getFullDateString, getTodayWithDaysFromNow } from "@/utils/utils";
import EntityDataTableLayout from "@/components/DataTable/layouts/EntityDataTableLayout";
import FinanceStatCard from "../FinanceStatCard";
import { useProjectedIncomes } from "../../hooks/useProjectedIncomes";
import { FinanceReport } from "../../models/financeReport";
import ProjectionsGroupedDataTable from "./ProjectionsGroupedDataTable";
import { TimeUnit } from "@/models";
import FinanceSectionLayout from "../../layouts/FinanceSectionLayout/FinanceSectionLayout";
import { financialComponentTypesConfig } from "../../lib/constants";
import { useProjectedIncomesByPeriod } from "../../hooks/useProjectedIncomesByPeriod";

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
        <div className="flex">
          <div className="w-9/12 pr-2">
            <ProjectionsGroupedDataTable defaultQuery={query} query={query} />
          </div>
          <div className="w-3/12 pl-2">
            <div className="mb-3">
              <span>
                Proyecciones desde {getFullDateString(query.start)} hasta{" "}
                {getFullDateString(query.end)}
              </span>
            </div>
            <FinanceStatCard
              title="Capital"
              className="mb-3"
              value={summary.capital}
            />
            <FinanceStatCard
              title="Intereses"
              className="mb-3"
              value={summary.interest}
            />
            <FinanceStatCard
              title="Total"
              className="mb-3"
              value={summary.total}
            />
          </div>
        </div>
      </EntityDataTableLayout.DataTable>
    </EntityDataTableLayout>
  );
};

export default ProjectionSection;
