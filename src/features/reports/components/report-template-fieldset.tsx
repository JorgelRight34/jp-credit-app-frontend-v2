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
import { reportTemplateKeysLabels } from '../lib/constants'
import { DASHES } from '@/lib/utils'
import { reportTemplatesDefinition } from '../lib/report-templates-map'

interface ReportTemplateDefinitionFieldsetProps {
  templateKey?: Report['key']
}

const ReportTemplateDefinitionFieldset = ({
  templateKey,
}: ReportTemplateDefinitionFieldsetProps) => {
  const data = templateKey ? reportTemplatesDefinition[templateKey] : null

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
          Object.keys(data).map((field) => {
            const template = data[field as keyof typeof data]

            return (
              <Accordion key={field} id={field}>
                <AccordionSummary>
                  {field} | {template.fieldType}
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
