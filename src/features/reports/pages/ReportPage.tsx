import { useParams } from "@/hooks/useParams";
import { useReport } from "../hooks/useReport";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import ReportsRunForm from "../components/ReportsRunForm";

const ReportPage = () => {
  const { id } = useParams();
  const { report } = useReport({ id });

  if (!report) return null;

  return (
    <EntityLayout title={`Reporte - ${report.title}`} edit={true}>
      <ReportsRunForm report={report} />
    </EntityLayout>
  );
};

export default ReportPage;
