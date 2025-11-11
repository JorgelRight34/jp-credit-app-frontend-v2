import { useQuery } from "@tanstack/react-query";
import { getLoan } from "../services/loanClient";
import { Loan } from "../models/loan";
import { loansQueryKey } from "../lib/constants";

interface UseLoanProps {
    id?: number | string;
}

const useLoan = ({ id }: UseLoanProps) => {
    const numericId = Number(id);
    const { data, isError, isLoading } = useQuery<Loan>({
        queryKey: [...loansQueryKey, numericId],
        queryFn: () => getLoan(Number(id)),
        enabled: !!id,
    });

    return { loan: data, isError, isLoading };
};

export default useLoan;
