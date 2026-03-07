import { AccordionSummary as MAccordionSummary } from '@mui/material'
import { PropsWithChildren } from 'react'
import MediumTitle from '../../text/medium-title'
import { ExpandMoreIcon } from '../../icon'

const AccordionSummary = ({ children }: PropsWithChildren) => {
  return (
    <MAccordionSummary
      className="bg-surface"
      expandIcon={<ExpandMoreIcon className="text-secondary" />}
    >
      <MediumTitle>{children}</MediumTitle>
    </MAccordionSummary>
  )
}

export default AccordionSummary
