import {
  DateLabel,
  Table,
  TableBody,
  TableContainer,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components'
import { PropsWithBackgroundService } from '../models/backgroundService'

const BackgroundServiceConfigurationsTable = ({
  worker,
}: PropsWithBackgroundService) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>INTERVÁLO</TableHeadCell>
          <TableHeadCell>HORA INICIO</TableHeadCell>
          <TableHeadCell>ULTIMA EJECUCIÓN</TableHeadCell>
          <TableHeadCell>FECHA INICIO</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {worker.configurations.map((c) => (
          <TableRow key={c.id}>
            <TableDataCell>{c.id}</TableDataCell>
            <TableDataCell>{c.dayDifference}</TableDataCell>
            <TableDataCell>{c.startTime}</TableDataCell>
            <TableDataCell>
              <DateLabel date={c.lastExecutionDate} />
            </TableDataCell>
            <TableDataCell>
              <DateLabel date={c.startDate} />
            </TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default BackgroundServiceConfigurationsTable
