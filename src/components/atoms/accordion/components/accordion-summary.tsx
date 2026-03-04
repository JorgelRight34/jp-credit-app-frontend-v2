import { AccordionSummary as MAccordionSummary } from '@mui/material'
import { PropsWithChildren } from 'react'
import MediumTitle from '../../text/medium-title'
import { ExpandMoreIcon } from '../../icon'

const AccordionSummary = ({ children }: PropsWithChildren) => {
  return (
    <MAccordionSummary expandIcon={<ExpandMoreIcon />}>
      <MediumTitle>{children}</MediumTitle>
    </MAccordionSummary>
  )
}

export default AccordionSummary
