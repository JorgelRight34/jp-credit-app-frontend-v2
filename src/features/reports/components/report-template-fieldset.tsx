import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  BigTitle,
  Fieldset,
  Paragraph,
} from '@/components'
import { Report } from '../models/report'
import { reportTemplateKeysLabels } from '../lib/constants'
import { DASHES } from '@/lib/utils'
import { reportTemplatesDefinition } from '../lib/templates/report-templates-map'

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
        {data?.map((field) => (
          <Accordion key={field.name} id={field.name}>
            <AccordionSummary>
              {field.name} | {field.fieldType}
            </AccordionSummary>
            <AccordionDetails>
              <Paragraph>{field.description}</Paragraph>
            </AccordionDetails>
          </Accordion>
        ))}
      </aside>
    </Fieldset>
  )
}

export default ReportTemplateDefinitionFieldset
