import { armotizationsCacheKey } from "../lib/constants";
import { useData } from "@/hooks/useData";
import { getLoanArmotization } from "../services/amortizationService";
import { ArmotizationLoanQuery } from "../models/amortizationLoanQuery";
import { useEffect } from "react";


type UseLoanArmotizationProps = ArmotizationLoanQuery

const useLoanArmotization = ({ loanId }: UseLoanArmotizationProps) => {
  const { data, isLoading, isError } = useData({
    key: [...armotizationsCacheKey, loanId],
    getData: () => getLoanArmotization(loanId!),
    enabled: !!loanId
  })

  useEffect(() => {
    console.log("changed", loanId)
  }, [loanId])

  return { armotization: data ?? { armotizations: [], paymentValue: 0 }, isLoading, isError };
};

export default useLoanArmotization;
