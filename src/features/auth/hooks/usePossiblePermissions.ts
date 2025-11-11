import { getAllPosiblePermissions } from "../services/userService";
import { useMemo } from "react";
import { toAllTitleCase } from "../../../utils/utils";
import { z } from "zod";
import { permissionsQueryKey } from "../lib/constants";
import { FormProvider } from "@/components/EntityForm/models/formProvider";
import { useData } from "@/hooks/useData";

const usePossiblePermissions = () => {
  const { data } = useData({
    key: [...permissionsQueryKey, "possible"],
    getData: getAllPosiblePermissions,
  });

  const permissionDomains = useMemo(() =>
    data?.possiblePermissions?.map((domain) => domain.formName) ?? []
    , [data]);

  const permissionFormFields = useMemo(() => {
    if (!data) return [];

    return data.possiblePermissions.map((domain) => ({
      name: domain.formName,
      id: domain.formName,
      label: domain.name,
      type: "select",
      options: [
        ...domain.claims.map((claim) => [
          claim.name,
          toAllTitleCase(claim.label),
        ]),
      ],
    }));
  }, [data]);

  const permissionsSchema = useMemo(() => {
    // Basic shape for a permission (string)
    const permissionsShape = z.string();

    // Permissions form schema generated dynamically
    const permissionsFormSchema = z.object(
      Object.fromEntries(permissionDomains.map((p) => [p, permissionsShape]))
    );

    return permissionsFormSchema;
  }, [permissionDomains]);

  const permissionsFormProvider = useMemo<FormProvider<Permissions>>(() => ({
    schema: permissionsSchema,
    fields: permissionFormFields
  }), [permissionsSchema, permissionFormFields])

  return { permissionDomains, permissionsFormProvider };
};

export default usePossiblePermissions;
