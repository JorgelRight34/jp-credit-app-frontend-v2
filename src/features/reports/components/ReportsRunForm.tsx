import { ReportRunFormFields } from "../lib/form";
import { triggerDownload } from "@/utils/utils";
import {
  Container,
  FileExplorer,
  FormBuilder,
  FormLayout,
  FormSubscriptionWrapper,
  mapApiFileToDatatableFile,
  MediumTitle,
  Subtitle,
  useEntityForm,
} from "@/components";
import { useReportsRunForm } from "../hooks/useReportsRunForm";
import { useSearchParams } from "@/hooks/useSearchParams";
import ReportsFormHelp from "./ReportsFormHelp";
import { Report } from "../models/report";

interface ReportsRunFormProps {
  report: Report;
}

const ReportsRunForm = ({ report }: ReportsRunFormProps) => {
  const { form, ref, onDirtyChange, ...methods } =
    useEntityForm<ReportRunFormFields>();
  const config = useReportsRunForm({ report });
  const params = useSearchParams();

  return (
    <FormLayout
      {...methods}
      isDirty={params.get("key") ? true : methods.isDirty}
    >
      <div className="flex items-stretch gap-4">
        <div className="w-8/12">
          <FormBuilder<Report, ReportRunFormFields, Blob>
            ref={ref}
            onSuccess={triggerDownload}
            onDirtyChange={onDirtyChange}
            {...config}
          />
          <Container className="mb-6 flex flex-col">
            <MediumTitle className="mb-2 text-2xl font-semibold">
              Descripción
            </MediumTitle>
            <Subtitle className="leading-relaxed">
              {report.description ?? "No hay descripción para este reporte."}
            </Subtitle>
          </Container>
          <Container>
            <FileExplorer
              files={[mapApiFileToDatatableFile(report.document)]}
            />
          </Container>
        </div>
        <div className="flex w-4/12 flex-1 flex-col py-6">
          <FormSubscriptionWrapper<ReportRunFormFields>
            form={form}
            subscribedNames={["key", "context"]}
            render={({ key, context }) => (
              <ReportsFormHelp
                entity={context}
                className="flex-1"
                listClassName="!max-h-[60vh]"
                entityId={key}
                reportKey={report.key}
              />
            )}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default ReportsRunForm;
