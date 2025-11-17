import { useEntityForm } from "@/components/EntityForm";
import FormLayout from "@/components/EntityForm/layouts/FormLayout";
import { useReportsRunForm } from "../hooks/useReportsRunForm";
import { Report } from "../models/report";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";
import Container from "@/components/ui/Container";
import {
  FileExplorer,
  mapApiFileToDatatableFile,
} from "@/components/FileUpload";
import ReportsFormHelp from "./ReportsFormHelp";
import FormSubscriptionWrapper from "@/components/EntityForm/components/FormSubscriptionWrapper";
import { ReportRunFormFields } from "../lib/form";
import { triggerDownload } from "@/utils/utils";
import { useQueryParams } from "@/hooks/useQueryParams";
import { MediumTitle, Subtitle } from "@/components";

interface ReportsRunFormProps {
  report: Report;
}

const ReportsRunForm = ({ report }: ReportsRunFormProps) => {
  const { form, ref, onDirtyChange, ...methods } =
    useEntityForm<ReportRunFormFields>();
  const config = useReportsRunForm({ report });
  const params = useQueryParams();

  return (
    <FormLayout {...methods} isDirty={params["key"] ? true : methods.isDirty}>
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
