import { AccordionProps, Accordion as MAccordion } from '@mui/material'

const SX = {
  backgroundColor: 'var(--color-surface)',
  borderColor: 'var(--bs-border-color)',
  '&:before': {
    dispaly: 'none',
  },
  boxShadow: 'none',
}

const Accordion = (props: AccordionProps) => {
  return <MAccordion {...props} sx={SX} />
}

export default Accordion
