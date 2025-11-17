"use client";

import { EntityForm } from "@/components";
import { useLoginForm } from "../hooks/useLoginForm";

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
