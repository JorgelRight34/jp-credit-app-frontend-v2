import { AccordionProps, Accordion as MAccordion } from '@mui/material'

const SX = {
  backgroundColor: 'var(--color-surface)',
}

const Accordion = (props: AccordionProps) => {
  return <MAccordion {...props} sx={SX} />
}

export default Accordion
