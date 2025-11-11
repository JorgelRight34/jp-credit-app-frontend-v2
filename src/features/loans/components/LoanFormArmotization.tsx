import ArmotizationDataTable from "@/features/Armotizations/components/AmortizationDataTable";
import useGenerateAmortization, {
  UseGenerateAmortizationProps,
} from "@/features/Armotizations/hooks/useGenerateArmotization";

type LoanFormArmotizationProps = UseGenerateAmortizationProps;

const LoanFormArmotization = ({ ...props }: LoanFormArmotizationProps) => {
  const { amortization } = useGenerateAmortization({
    ...props,
  });

  return (
    <ArmotizationDataTable
      defaultQuery={{}}
      data={amortization.amortizations}
      totalItems={amortization.amortizations.length}
    />
  );
};

export default LoanFormArmotization;
