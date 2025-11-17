import {
  reportsClient,
  reportsModulePermissionsProvider,
  ReportsRunForm,
} from "@/features/reports";
import { EntityLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";

export async function generateMetadata({ params }: AppPageProps) {
  const report = await reportsClient.getReport(params.id);

  return { title: report.title };
}

const Page = async ({ params }: AppPageProps) => {
  const report = await reportsClient.getReport(params.id);

  return (
    <EntityLayout
      permissionsProvider={reportsModulePermissionsProvider}
      title={`Reporte - ${report.title}`}
      edit={true}
    >
      <ReportsRunForm report={report} />
    </EntityLayout>
  );
};

export default Page;
