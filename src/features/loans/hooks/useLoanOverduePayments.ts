import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getLoanOverduePayments } from "../services/loanClient";
import { OverduePayment } from "../../Transactions/models/overduePayment";

interface UseOverduePaymentsProps {
  loanId?: number;
}

const useLoanOverduePayments = ({ loanId }: UseOverduePaymentsProps) => {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useQuery<OverduePayment[]>({
    queryKey: ["loans", loanId, "overdue-payments", page],
    queryFn: () => getLoanOverduePayments(loanId!, page),
    enabled: !!loanId,
  });

  const fetchPage = (page: number) => setPage(page);

  return { overduePayments: data || [], fetchPage, isError, isLoading };
};

export default useLoanOverduePayments;
