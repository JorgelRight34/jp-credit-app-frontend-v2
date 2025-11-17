import { amortizationsCacheKey, } from "../lib/constants";
import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";
import { useData } from "@/hooks/useData";
import { Amortization } from "../models/amortization";
import { getAmortization } from "../services/calculatorClient";

export type UseGenerateAmortizationProps = AmortizationCalculatorInput & {
  enabled?: boolean;
}

function isValidLoanQuery(query: AmortizationCalculatorInput): boolean {
  return (
    query.paymentFrequency !== undefined && query?.paymentFrequency > 0 &&
    query.numberOfPayments !== undefined && query?.numberOfPayments > 0 &&
    query.annualInterestRate !== undefined && query?.annualInterestRate > 0 &&
    query.principalBalance !== undefined && query?.principalBalance > 0
  );
}


export const useGenerateAmortization = ({ enabled, ...query }: UseGenerateAmortizationProps) => {
  const { data, isLoading, isError } = useData<Amortization>({
    key: [...amortizationsCacheKey, query.principalBalance, query.numberOfPayments, query.paymentFrequency, query.compound],
    getData: () => getAmortization(query),
    enabled: enabled && isValidLoanQuery(query)
  })

  return { amortization: data ?? { amortizations: [] }, isLoading, isError };
};

export default useGenerateAmortization;
