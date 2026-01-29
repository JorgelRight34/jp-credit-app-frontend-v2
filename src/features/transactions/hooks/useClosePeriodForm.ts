"use client"

import { UseEntityFormReturn } from "@/components";
import { closedPeriodFormProvider, ClosedPeriodFormValues } from "../lib/form";
import { ClosedPeriod } from "../models/closedPeriod";
import { transactionClient } from "../services/transactionsClient";
import { useData } from "@/hooks/useData";
import { useMemo } from "react";
import dayjs from "dayjs";


export const useClosePeriodForm = (): UseEntityFormReturn<ClosedPeriod, ClosedPeriodFormValues> => {
  const { data: lastClosedPeriod } = useData({
    key: ["last-closed-period"],
    getData: transactionClient.getLastClosedPeriod
  })

  const defaultValues = useMemo<Partial<ClosedPeriodFormValues>>(() => ({
    startDate: lastClosedPeriod?.startDate
      ? dayjs(lastClosedPeriod.startDate).toISOString()
      : undefined,

    endDate: lastClosedPeriod?.endDate
      ? dayjs(lastClosedPeriod.endDate).toISOString()
      : undefined
  }), [lastClosedPeriod]);

  const onSubmit = async (data: ClosedPeriodFormValues) => {
    return await transactionClient.closePeriod(data)
  }

  return {
    onSubmit,
    config: {
      formProvider: closedPeriodFormProvider,
      defaultValues,
      cacheKeysToInvalidate: [],
      tagsToInvalidate: [],
    }
  }
};
