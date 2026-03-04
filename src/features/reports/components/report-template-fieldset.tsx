import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  BigTitle,
  Fieldset,
} from '@/components'
import { useData } from '@/hooks/useData'
import { reporstQueryKey } from '../lib/query-keys'
import { Report } from '../models/report'
import { getReportTemplateDefinition } from '../services/reportsClient'
import { reportTemplateKeysLabels } from '../lib/constants'
import { DASHES } from '@/lib/utils'

interface ReportTemplateDefinitionFieldsetProps {
  templateKey?: Report['key']
}

const ReportTemplateDefinitionFieldset = ({
  templateKey,
}: ReportTemplateDefinitionFieldsetProps) => {
  const { data } = useData({
    key: [reporstQueryKey, 'templates', templateKey],
    loader: () => getReportTemplateDefinition(templateKey!),
    enabled: !!templateKey,
  })

  return (
    <Fieldset
      className="flex-1 shadow-sm"
      legendClassName="text-center"
      legend="DICCIONARIO"
    >
      <BigTitle className="flex-shrink-0 text-accent text-center">
        {templateKey ? reportTemplateKeysLabels[templateKey] : DASHES}
      </BigTitle>
      <aside className="flex-1 h-96 !overflow-y-auto">
        {data &&
          Object.keys(data.fields).map((field) => {
            const template = data.fields[field as keyof typeof data.fields]

            return (
              <Accordion key={template.propertyPath} id={template.propertyPath}>
                <AccordionSummary>
                  {template.propertyPath} | {template.fieldType}
                </AccordionSummary>
                <AccordionDetails>{template.description}</AccordionDetails>
              </Accordion>
            )
          })}
      </aside>
    </Fieldset>
  )
}

export default ReportTemplateDefinitionFieldset
