import {
  Chip,
  Fieldset,
  RuleListItem,
  Table,
  TableBody,
  TableContainer,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components'
import { formattersDefinition } from '../lib/config/formatters-definition'

const FormattersDefinitionPanel = () => {
  return (
    <section className="flex">
      <div className="w-8/12 overflow-y-auto">
        <FormattersDefinitionTable />
      </div>
      <div className="w-4/12 pl-6">
        <RulesFieldset />
      </div>
    </section>
  )
}

const FormattersDefinitionTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className="border-b">
            <TableHeadCell>
              <div className="flex items-center">Llave</div>
            </TableHeadCell>
            <TableHeadCell>
              <div className="flex">Síntaxis</div>
            </TableHeadCell>
            <TableHeadCell>
              <div className="flex">Descripción</div>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattersDefinition.map((formatter, index) => (
            <TableRow key={index}>
              <TableDataCell className="text-accent">
                {formatter.key}
              </TableDataCell>
              <TableDataCell>
                <code>{formatter.example}</code>
              </TableDataCell>
              <TableDataCell className="max-w-xs break-words">
                {formatter.description}
              </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const RulesFieldset = () => {
  return (
    <Fieldset legendClassName="text-center" className="h-full" legend="REGLAS">
      <ul className="space-y-12 text-sm">
        <RuleListItem icon="⚙">
          Puedes <span className="font-semibold">combinar pipes</span> para
          encadenar transformaciones:{' '}
          <Chip>
            <span className="italic font-mono text-xs">
              {'{{ monto | number:trim | upper }}'}
            </span>
          </Chip>
        </RuleListItem>
        <RuleListItem icon="↕">
          El <span className="font-semibold">orden importa</span> — los pipes se
          aplican de izquierda a derecha.
        </RuleListItem>
        <RuleListItem icon="Aa">
          Es <span className="font-semibold">case sensitive</span> —{' '}
          <Chip>date:dd/MM/yyyy</Chip> es válido pero{' '}
          <Chip>date:DD/mm/YYYY</Chip> no.
        </RuleListItem>
        <RuleListItem icon="✦">
          Si la clave no existe en el contexto, se renderiza como{' '}
          <Chip>vacío</Chip>.
        </RuleListItem>
        <RuleListItem icon="↩">
          Si el formato falla (ej. texto en un campo numérico), se devuelve el{' '}
          <span className="font-semibold">valor original</span> sin cambios.
        </RuleListItem>
      </ul>
    </Fieldset>
  )
}

export default FormattersDefinitionPanel
