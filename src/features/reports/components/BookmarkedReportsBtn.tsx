"use client";

import SplitBtn, { SplitBtnProps } from "@/components/atoms/button/SplitBtn";
import { ReportKey } from "../models/reportKey";
import { Params } from "@/models/params";
import { useBookMarkedReports } from "../hooks/useBookmarkedReports";
import { useRouter } from "@/hooks/useRouter";
import { useMemo } from "react";
import { getUrlParams } from "@/utils/utils";
import { MenuOption } from "@/components/molecules/menu/Menu";
import { SecondaryBtn } from "@/components";

type BookMarkedReportsBtnProps = Omit<SplitBtnProps, "options" | "Button"> & {
  reportKey: ReportKey;
  params?: Params;
};

const BookMarkedReportsBtn = ({
  reportKey,
  params,
  ...props
}: BookMarkedReportsBtnProps) => {
  const { reports } = useBookMarkedReports({ key: reportKey });
  const router = useRouter();

  const reportParams = useMemo(
    () => `${params ? `/?` + params.toString() : ""}`,
    [params],
  );

  const defaultOption = useMemo<MenuOption>(
    () => ({
      label: "+ Ver todos",
      onClick: () => router.push(`/reports/${reportKey}s${reportParams}`),
    }),
    [reportKey, reportParams, router],
  );

  const options = useMemo<MenuOption[]>(() => {
    if (!reports) return [defaultOption];

    return [
      ...(reports?.items.map((option) => ({
        label: option.title,
        onClick: () => router.push(`/reports/${option.id}${reportParams}`),
      })) ?? []),
      defaultOption,
    ];
  }, [defaultOption, reportParams, reports, router]);

  return (
    <SplitBtn
      {...props}
      icon="home_storage"
      options={options}
      Button={SecondaryBtn}
      onClick={defaultOption.onClick}
    >
      Reportes
    </SplitBtn>
  );
};

export default BookMarkedReportsBtn;
