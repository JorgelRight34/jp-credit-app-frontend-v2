import {
  BreadcrumbSpec,
  InputElement,
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
import { GenerateReportHandler } from '../models/handlers'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'
import { reportsBreadcrumb } from './reports-page-layout'

interface GenerateReportPageLayoutProps<T> {
  breadcrumb: BreadcrumbSpec
  templateDefinition: ReportTemplateDefinition<T>
  onSubmit: GenerateReportHandler
  searchInput: InputElement
}

const GenerateReportPageLayout = <T,>({
  breadcrumb,
  ...props
}: GenerateReportPageLayoutProps<T>) => (
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
        <ReportGenerationForm {...props} />
      </TabPanel>
      <TabPanel index={1}>
        <FormattersDefinitionPanel />
      </TabPanel>
    </Tabs>
  </PageLayout>
)

export default GenerateReportPageLayout
