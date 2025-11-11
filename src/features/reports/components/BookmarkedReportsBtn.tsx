import SplitBtn, { SplitBtnProps } from "@/components/ui/SplitBtn";
import { useBookMarkedReports } from "../hooks/useBookmarkedReports";
import { ReportKey } from "../models/reportKey";
import { useMemo } from "react";
import { MenuOption } from "@/components/ui/Menu";
import { useRouter } from "@/hooks/useRouter";
import { Params } from "@/models/params";
import { getUrlParams } from "@/utils/utils";
import { SecondaryBtn } from "@/components/ui";

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
    () => `${params ? `/?` + getUrlParams(params) : ""}`,
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
