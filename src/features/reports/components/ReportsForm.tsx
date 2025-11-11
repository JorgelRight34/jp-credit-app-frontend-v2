import { EntityFormProps, useEntityForm } from "@/components/EntityForm";
import { useReportsForm } from "../hooks/useReportsForm";
import { ReportFormFields } from "../lib/form";
import FormLayout from "@/components/EntityForm/layouts/FormLayout";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";
import { Report } from "../models/report";
import FormSubscriptionWrapper from "@/components/EntityForm/components/FormSubscriptionWrapper";
import ReportsFormHelp from "./ReportsFormHelp";
import Container from "@/components/ui/Container";
import { ReportKey } from "../models/reportKey";
import { useReportFileForm } from "../hooks/useReportFileForm";
import { UploadFileForm } from "@/components/FileUpload";
import FileFormButton from "@/components/FileUpload/components/FileFormButton";
import { SecondaryBtn } from "@/components/ui";
import { ApiFile } from "@/models";
import FileFormExplorer from "@/components/FileUpload/components/FileFormExplorer";
import { useRef } from "react";
import { UploadFileFormRef } from "@/components/FileUpload/components/UploadFileForm";

type ReportsFormProps = EntityFormProps<ReportFormFields, Report>;

const ReportsForm = ({ edit }: ReportsFormProps) => {
  const config = useReportsForm({ edit });
  const { form, ref, onDirtyChange, ...methods } =
    useEntityForm<ReportFormFields>();
  const fileFormRef = useRef<UploadFileFormRef>(null);
  const fileFormConfig = useReportFileForm({ form, edit });

  return (
    <FormLayout {...methods} onSubmit={fileFormRef.current?.submit}>
      <div className="flex items-stretch gap-4">
        <div className="w-8/12">
          <FormBuilder
            ref={ref}
            layout={[["title"], ["key"], ["description"]]}
            edit={edit}
            onDirtyChange={onDirtyChange}
            {...config}
          />
          <Container className="space-y-3">
            <UploadFileForm
              {...fileFormConfig}
              ref={fileFormRef}
              onDirtyChange={onDirtyChange}
              render={FileFormExplorer}
            />
            <FileFormButton
              onSubmit={async (data) => {
                fileFormRef.current?.onChange((prev) => ({
                  ...prev,
                  created: [...prev.created, data],
                }));
                return data as ApiFile;
              }}
              onDirtyChange={onDirtyChange}
            >
              <SecondaryBtn type="button" className="w-full" icon="link">
                Tengo un enlace
              </SecondaryBtn>
            </FileFormButton>
          </Container>
        </div>
        <div className="flex w-4/12 flex-1 flex-col py-6">
          <FormSubscriptionWrapper
            form={form}
            subscribedNames={["key"]}
            render={({ key }) => (
              <ReportsFormHelp
                listClassName="!max-h-[65vh]"
                className="flex-1"
                reportKey={key as ReportKey}
              />
            )}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default ReportsForm;
