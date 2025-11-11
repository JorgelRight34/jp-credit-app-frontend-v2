import clsx from "clsx";
import { toCurrency } from "../../../utils/utils";
import { Icon } from "@/components/ui";
import { IconName } from "@/models";
import { useMemo } from "react";

interface FinancevalueCardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title: string;
  value: number;
  comparedValue?: number;
  icon?: IconName;
  isCurrency?: boolean;
}

const FinancevalueCard = ({
  title,
  className,
  comparedValue,
  icon,
  value,
  isCurrency = true,
  color,
  ...props
}: FinancevalueCardProps) => {
  const { isPositive, comparisonResultLabel } = useMemo(() => {
    if (!comparedValue) {
      return { isPositive: undefined, comparisonResultLabel: undefined };
    }

    const positive = value >= comparedValue;
    const percentageDifference = ((value * 100) / comparedValue).toFixed(2);

    return {
      isPositive: positive,
      comparisonResultLabel: positive
        ? `+${percentageDifference}`
        : `-${percentageDifference}`,
    };
  }, [value, comparedValue]);

  return (
    <div
      className={clsx("flex-1 rounded-lg border p-3 shadow-sm", className)}
      {...props}
    >
      {icon && (
        <div className="mb-3 flex items-start justify-between">
          <Icon className="text-2xl text-gray-700" icon={icon} />
        </div>
      )}
      <div className="space-y-2">
        <h5 className="border-bottom flex items-center gap-2 pb-2 text-sm font-medium text-gray-600">
          {title}
          {color && (
            <div
              className="h-4 w-4 rounded shadow-sm"
              style={{
                background: color,
              }}
            ></div>
          )}
        </h5>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-900">
            {isCurrency ? toCurrency(value) : value}
          </span>
          {comparedValue && (
            <span className="text-1xl font-bold text-gray-400">
              {isCurrency ? toCurrency(comparedValue) : value}
            </span>
          )}
        </div>

        {comparisonResultLabel && (
          <div className="mt-3 flex items-center justify-end gap-2">
            <span
              className={clsx(
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm transition-colors",
                {
                  "bg-green-100 text-green-700": isPositive,
                  "bg-red-100 text-red-700": !isPositive,
                },
              )}
            >
              <span
                className={clsx("mr-1 text-base", {
                  "text-green-500": isPositive,
                  "text-red-500": !isPositive,
                })}
              >
                {isPositive ? "▲" : "▼"}
              </span>
              {comparisonResultLabel}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancevalueCard;
