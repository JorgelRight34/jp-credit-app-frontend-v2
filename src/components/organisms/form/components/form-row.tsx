import { Row } from '@/components/molecules'
import type { PropsWithChildren } from 'react'

const FormRow = ({ children }: PropsWithChildren) => {
  return <Row>{children}</Row>
}

export default FormRow
