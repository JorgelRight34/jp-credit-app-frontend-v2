import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  BigTitle,
  Fieldset,
  Paragraph,
} from '@/components'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'

interface ReportTemplateDefinitionFieldsetProps<T> {
  templateDefinition: ReportTemplateDefinition<T>
}

const ReportTemplateDefinitionFieldset = <T,>({
  templateDefinition,
}: ReportTemplateDefinitionFieldsetProps<T>) => {
  return (
    <Fieldset
      className="h-full shadow-sm"
      legendClassName="text-center"
      legend="DICCIONARIO"
    >
      <BigTitle className="text-accent flex-shrink-0 text-center">
        {templateDefinition.title}
      </BigTitle>
      <div className="flex max-h-96 flex-1 flex-col overflow-y-auto">
        {templateDefinition.definitions.map((field) => (
          <Accordion key={field.name} id={field.name}>
            <AccordionSummary>
              {field.name} | {field.fieldType}
            </AccordionSummary>
            <AccordionDetails>
              <Paragraph>{field.description}</Paragraph>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Fieldset>
  )
}

export default ReportTemplateDefinitionFieldset
