import { ReactNode } from "react";
import { FinanceReport } from "../../models/financeReport";
import { Tab, Tabs } from "@/components/Tabs";
import {
  dateToIsoString,
  getFullDateString,
  getUrlParams,
} from "@/utils/utils";
import { AppLink, Icon } from "@/components/ui";
import { FinanceQuery } from "../../models/financeQuery";

interface FinancePrincipalLayoutProps<T = FinanceReport> {
  table?: ReactNode;
  report?: T;
  query: FinanceQuery;
  to?: string;
  chart?: (report: T) => ReactNode;
}

const FinancePrincipalLayout = <T,>({
  report,
  chart,
  query,
  to,
  table,
}: FinancePrincipalLayoutProps<T>) => {
  return (
    <div className="order-md-1 order-2 w-full pr-2 md:w-9/12">
      {report && (
        <Tabs
          defaultActiveKey="chart"
          tabListClassName="flex justify-end"
          variation="minimal"
          navigate={false}
        >
          {chart && (
            <Tab path="chart" title="Gráfica" icon="show_chart">
              {chart(report)}
              <div className="mt-6 flex w-fit flex-col rounded-xl border p-2 shadow-sm">
                <div>
                  Transacciones desde {getFullDateString(query.start)} hasta{" "}
                  {getFullDateString(query.end)}
                </div>
                <AppLink
                  className="text-accent"
                  to={{
                    pathname: to,
                    search: getUrlParams({
                      startDate: dateToIsoString(query.start),
                      endDate: dateToIsoString(query.end),
                    }),
                  }}
                >
                  <Icon icon="arrow_right_alt" orientation="right">
                    Ver Transacciones
                  </Icon>
                </AppLink>
              </div>
            </Tab>
          )}
          <Tab path="table" icon="table" title="Tabla">
            {table}
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

export default FinancePrincipalLayout;
