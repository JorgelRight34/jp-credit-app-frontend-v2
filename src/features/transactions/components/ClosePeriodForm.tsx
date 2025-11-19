import { EntityForm } from "@/components";
import { useClosePeriodForm } from "../hooks/useClosePeriodForm";

const ClosePeriodForm = () => {
  const methods = useClosePeriodForm();

  return <EntityForm {...methods} />;
};

export default ClosePeriodForm;
