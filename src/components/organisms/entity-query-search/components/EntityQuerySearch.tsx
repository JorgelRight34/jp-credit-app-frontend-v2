import { Query } from "@/models/query";
import clsx from "clsx";
import { FormProvider } from "react-hook-form";
import EntityQuerySearchMoreFields from "./EntityQuerySearchMoreFilters";
import { useToggler } from "@/hooks/useToggler";
import ShowAllFiltersTrigger from "./ShowAllFiltersTrigger";
import { LightBtn } from "@/components/atoms";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SMALL_SCREEN_BREAKPOINT } from "@/utils/constants";
import SearchBtn from "@/components/atoms/button/SearchBtn";
import { FormFieldInput } from "../../form-builder";
import useEntityQuerySearch, {
  UseEntityQuerySearchProps,
} from "../hooks/useEntityQuerySearch";
import { QuerySearchInput } from "../models/querySearchInput";
import { DownloadReportBtn, ReportOptions } from "@/features/reports";

interface EntityQuerySearchProps<T extends Query, TReturn>
  extends UseEntityQuerySearchProps<T, TReturn> {
  fields: QuerySearchInput<T>[];
  moreFields?: QuerySearchInput<T>[];
  reportTitle?: string;
  renderLabel?: boolean;
  showIfSelectedProject?: boolean;
  onDownload?: (options: ReportOptions) => Promise<Blob>;
}

const EntityQuerySearch = <T extends Query, TReturn>({
  defaultValues,
  reportTitle = "",
  onDownload,
  onSubmit,
  ...props
}: EntityQuerySearchProps<T, TReturn>) => {
  const isMobile = useMediaQuery(SMALL_SCREEN_BREAKPOINT);
  const [showAllFilters, toggleShowAllFilters] = useToggler(false);

  const { fields, moreFields, form, searchOnKeyUp, download, handleSearch } =
    useEntityQuerySearch<T, TReturn>({
      onDownload,
      onSubmit,
      defaultValues,
      ...props,
    });

  return (
    <FormProvider {...form.methods}>
      <div className="flex" onKeyUp={searchOnKeyUp}>
        {!isMobile &&
          fields.map(({ col, ...field }, index) => (
            <div
              className={clsx(`hidden w-full items-center md:flex lg:mb-0`, {
                [`lg:w-${col}/12`]: col,
              })}
              key={index}
            >
              <FormFieldInput
                formField={field}
                className={clsx("!w-full px-1", {
                  "pl-0": index === 0,
                })}
              />
            </div>
          ))}
        {Array.isArray(fields) && fields.length > 0 && (
          <div className="hidden md:block">
            <ShowAllFiltersTrigger
              showAll={showAllFilters}
              toggle={toggleShowAllFilters}
              Component={LightBtn}
              className="w-full"
            />
          </div>
        )}
        <div className="hidden pr-1 md:block">
          <DownloadReportBtn
            className="w-full"
            title={reportTitle}
            reportOptions={{ initialPage: form.getValues().page }}
            onDownload={download}
          />
        </div>
        <div className="hidden w-2/12 pl-1 md:block">
          <SearchBtn className="w-full" onClick={handleSearch} />
        </div>
      </div>
      <fieldset
        className={clsx("mt-3 rounded-xl border shadow-sm", {
          "md:hidden": !showAllFilters,
        })}
      >
        <div className="border-bottom flex justify-between px-3 py-2 md:hidden">
          Filtros
          <ShowAllFiltersTrigger
            showAll={showAllFilters}
            toggle={toggleShowAllFilters}
          />
        </div>
        <div className={clsx("p-3", { "hidden md:block": !showAllFilters })}>
          <EntityQuerySearchMoreFields<T>
            className="hidden md:flex"
            fields={moreFields}
            columns={2}
          />
          {isMobile && (
            <EntityQuerySearchMoreFields<T>
              className="block md:hidden"
              fields={[...fields, ...moreFields]}
              columns={1}
            />
          )}
          <div className="mt-3 w-full md:hidden">
            <DownloadReportBtn
              className="w-full shadow-sm"
              title={reportTitle}
              reportOptions={{ initialPage: form.getValues().page }}
              onDownload={download}
            />
            <SearchBtn
              className="mt-3 w-full shadow-sm"
              onClick={handleSearch}
            />
          </div>
        </div>
      </fieldset>
    </FormProvider>
  );
};

EntityQuerySearch.whyDidYouRender = true;

export default EntityQuerySearch;
