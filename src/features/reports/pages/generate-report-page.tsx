import {
  PageLayout,
  PageLayoutBreadcrumb,
  PrintIcon,
  Tab,
  TabList,
  TabsPanelContainer,
} from '@/components'
import { reportsBreadcrumb } from './reports-page'
import ReportGenerationForm from '../components/report-generation-form'

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
      <TabList>
        <Tab title="Formulario" isActive />
      </TabList>
      <TabsPanelContainer>
        <ReportGenerationForm />
      </TabsPanelContainer>
    </PageLayout>
  )
}

export default GenerateReportPage
