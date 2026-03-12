import {
  PageLayout,
  PageLayoutBreadcrumb,
  PrintIcon,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
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
      <Tabs>
        <TabsList>
          <Tab index={0}>Formulario</Tab>
          <Tab index={1}>Formatos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ReportGenerationForm />
        </TabPanel>
        <TabPanel index={1}>
          <FormattersDefinitionPanel />
        </TabPanel>
      </Tabs>
    </PageLayout>
  )
}

export default GenerateReportPage
