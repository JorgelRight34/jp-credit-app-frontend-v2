import {
  BreadcrumbSpec,
  PageLayout,
  PageLayoutBreadcrumb,
  PrintIcon,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import ReportGenerationForm from '../components/report-generation-form'
import FormattersDefinitionPanel from '../components/formatters-definition-panel'
import { reportsBreadcrumb } from './reports-page-layout'
import { PropsWithReportKey } from '../models/report'

interface GenerateReportPageLayoutProps extends PropsWithReportKey {
  breadcrumb: BreadcrumbSpec
}

const GenerateReportPageLayout = ({
  reportKey,
  breadcrumb,
}: GenerateReportPageLayoutProps) => (
  <PageLayout
    title="Generar reporte"
    breadcrumb={
      <PageLayoutBreadcrumb
        breadcrumbs={[
          reportsBreadcrumb,
          breadcrumb,
          { icon: PrintIcon, title: 'Generar' },
        ]}
      />
    }
  >
    <Tabs>
      <TabsList>
        <Tab index={0}>Formulario</Tab>
        <Tab index={1}>Formatos</Tab>
      </TabsList>
      <TabPanel index={0}>
        <ReportGenerationForm reportKey={reportKey} />
      </TabPanel>
      <TabPanel index={1}>
        <FormattersDefinitionPanel />
      </TabPanel>
    </Tabs>
  </PageLayout>
)

export default GenerateReportPageLayout
