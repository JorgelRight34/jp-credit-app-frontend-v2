import {
  AmortizationDataTable,
  useGenerateAmortization,
  UseGenerateAmortizationProps,
} from "@/features/calculators";

type LoanFormArmotizationProps = UseGenerateAmortizationProps;

const LoanFormArmotization = ({ ...props }: LoanFormArmotizationProps) => {
  const { amortization } = useGenerateAmortization({
    ...props,
  });

  return (
    <AmortizationDataTable
      defaultQuery={{}}
      data={amortization.amortizations}
      totalItems={amortization.amortizations.length}
    />
  );
};

export default LoanFormArmotization;
