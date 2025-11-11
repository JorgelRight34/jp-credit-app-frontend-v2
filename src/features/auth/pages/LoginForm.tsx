import { useLoginForm } from "../hooks/useLoginForm";
import { EntityForm } from "@/components/EntityForm";

const LoginForm = () => {
  const methods = useLoginForm();

  return (
    <EntityForm
      layout={[["username"], ["password"]]}
      {...methods}
      showReset={false}
    />
  );
};

export default LoginForm;
