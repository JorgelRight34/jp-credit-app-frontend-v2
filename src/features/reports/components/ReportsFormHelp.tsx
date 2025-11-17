import clsx from "clsx";
import { useMemo } from "react";
import { toTitleCase } from "@/utils/utils";
import { reportContextRegistry } from "../lib/contextMap";
import { ReportKey } from "../models/reportKey";
import { Icon, LoadingSpinner } from "@/components";

interface ReportsFormHelpProps extends React.HTMLAttributes<HTMLDivElement> {
  reportKey?: ReportKey;
  entityId?: number;
  listClassName?: string;
  entity?: object;
  isLoading?: boolean;
}

const ReportsFormHelp = ({
  reportKey,
  entityId,
  entity,
  listClassName,
  className,
  isLoading,
}: ReportsFormHelpProps) => {
  const contextDefinition = reportKey ? reportContextRegistry[reportKey] : null;
  const entitySchema = contextDefinition?.fields;

  const entries = useMemo(() => {
    if (!entitySchema) return [];
    return Object.entries(entitySchema);
  }, [entitySchema]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className={clsx(
        "flex-none rounded-xl border border-gray-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="border-bottom flex-shrink-0 p-3">
        <Icon icon="dictionary">
          Diccionario para {contextDefinition?.label} {entityId}
        </Icon>
      </div>
      <div
        className={clsx("flex flex-1 flex-col overflow-y-auto", listClassName)}
      >
        {entity ? (
          <div className="bg-gray-50 p-3">
            <pre className="overflow-wrap-anywhere font-mono text-sm break-words whitespace-pre-wrap">
              {JSON.stringify(entity, null, 2)}
            </pre>
          </div>
        ) : (
          <ul className="list-none space-y-6 p-3">
            {entries.map(([placeholder, description]) => (
              <li
                key={placeholder}
                className="border-bottom flex flex-col justify-between space-y-1"
              >
                <b>{toTitleCase(placeholder)}</b>
                <span>{description.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportsFormHelp;
