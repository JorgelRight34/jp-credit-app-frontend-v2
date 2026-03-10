import {
  PageLayout,
  PageLayoutBreadcrumb,
  PrintIcon,
  Tab,
  Tabs,
} from '@/components'
import { reportsBreadcrumb } from './reports-page'
import ReportGenerationForm from '../components/report-generation-form'
import FormattersDefinitionPanel from '../components/formatters-definition-panel'

const GenerateReportPage = () => {
  return (
    <PageLayout
      title="Generar reporte"
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[
            reportsBreadcrumb,
            { icon: PrintIcon, title: 'Generar' },
          ]}
        />
      }
    >
      <Tabs defaultActiveKey="form">
        <Tab eventKey="form" title="Formulario">
          <ReportGenerationForm />
        </Tab>
        <Tab eventKey="formatters" title="Formatos">
          <FormattersDefinitionPanel />
        </Tab>
      </Tabs>
    </PageLayout>
  )
}

export default GenerateReportPage
